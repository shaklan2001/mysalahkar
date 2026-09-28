/** Shown this many seconds before the wallet can no longer pay the next minute. */
export const CALL_LOW_BALANCE_WARNING_SECONDS = 60;

const SECONDS_PER_MINUTE = 60;
const DEFAULT_FREE_MINUTES = 5;
const DEFAULT_RUPEES_PER_MINUTE = 10;
const MAX_FREE_MINUTES = 180;
const MAX_RUPEES_PER_MINUTE = 100_000;

export type CallRates = {
  freeMinutes: number;
  rupeesPerMinute: number;
};

export type MeterTick = {
  debitPaise: number;
  paidMinutesDue: number;
  secondsRemaining: number;
  warn: boolean;
  cut: boolean;
};

function parseMinuteSetting(raw: string | undefined, fallback: number, max: number, name: string): number {
  if (raw === undefined || raw.trim() === "") return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0 || value > max) {
    throw new Error(`${name} must be a whole number from 0 to ${max}`);
  }
  return value;
}

/** Free minutes and the per-minute price. Both come from env; defaults match .env.example. */
export function readCallRates(): CallRates {
  return {
    freeMinutes: parseMinuteSetting(
      process.env.NEXT_PUBLIC_AGENT_FREE_MINUTES,
      DEFAULT_FREE_MINUTES,
      MAX_FREE_MINUTES,
      "NEXT_PUBLIC_AGENT_FREE_MINUTES",
    ),
    rupeesPerMinute: parseMinuteSetting(
      process.env.NEXT_PUBLIC_AGENT_RUPEES_PER_MINUTE,
      DEFAULT_RUPEES_PER_MINUTE,
      MAX_RUPEES_PER_MINUTE,
      "NEXT_PUBLIC_AGENT_RUPEES_PER_MINUTE",
    ),
  };
}

/**
 * Frontend call clock. Charges one minute at the start of each paid minute.
 * `chargedMinutes` is how many paid minutes this call has already debited.
 */
export function meterTick(input: {
  elapsedSeconds: number;
  balancePaise: number;
  chargedMinutes: number;
  freeMinutes: number;
  rupeesPerMinute: number;
}): MeterTick {
  const freeSeconds = input.freeMinutes * SECONDS_PER_MINUTE;
  const ratePaise = input.rupeesPerMinute * 100;

  if (input.rupeesPerMinute === 0) {
    return {
      debitPaise: 0,
      paidMinutesDue: 0,
      secondsRemaining: Number.POSITIVE_INFINITY,
      warn: false,
      cut: false,
    };
  }

  const paidMinutesDue =
    input.elapsedSeconds < freeSeconds
      ? 0
      : Math.floor((input.elapsedSeconds - freeSeconds) / SECONDS_PER_MINUTE) + 1;
  const minutesToCharge = Math.max(0, paidMinutesDue - input.chargedMinutes);
  const debitPaise = minutesToCharge * ratePaise;

  if (debitPaise > input.balancePaise) {
    return {
      debitPaise: 0,
      paidMinutesDue: input.chargedMinutes,
      secondsRemaining: 0,
      warn: false,
      cut: true,
    };
  }

  const balanceAfter = input.balancePaise - debitPaise;
  const extraMinutes = Math.floor(balanceAfter / ratePaise);
  const intoPaidMinute = (input.elapsedSeconds - freeSeconds) % SECONDS_PER_MINUTE;
  const secondsLeftInSegment =
    input.elapsedSeconds < freeSeconds
      ? freeSeconds - input.elapsedSeconds
      : intoPaidMinute === 0
        ? SECONDS_PER_MINUTE
        : SECONDS_PER_MINUTE - intoPaidMinute;

  const secondsRemaining = secondsLeftInSegment + extraMinutes * SECONDS_PER_MINUTE;
  return {
    debitPaise,
    paidMinutesDue,
    secondsRemaining,
    warn: secondsRemaining > 0 && secondsRemaining <= CALL_LOW_BALANCE_WARNING_SECONDS,
    cut: secondsRemaining <= 0,
  };
}

export function formatClock(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return "—";
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
  const rest = seconds % SECONDS_PER_MINUTE;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function selfCheck(): void {
  const free = meterTick({
    elapsedSeconds: 240,
    balancePaise: 0,
    chargedMinutes: 0,
    freeMinutes: 5,
    rupeesPerMinute: 10,
  });
  if (!free.warn || free.cut || free.debitPaise !== 0) throw new Error("call meter should warn 1 min before free time ends");

  const broke = meterTick({
    elapsedSeconds: 300,
    balancePaise: 0,
    chargedMinutes: 0,
    freeMinutes: 5,
    rupeesPerMinute: 10,
  });
  if (!broke.cut) throw new Error("call meter should cut when free time ends with an empty wallet");

  const charged = meterTick({
    elapsedSeconds: 300,
    balancePaise: 2000,
    chargedMinutes: 0,
    freeMinutes: 5,
    rupeesPerMinute: 10,
  });
  if (charged.debitPaise !== 1000 || charged.warn || charged.secondsRemaining !== 120) {
    throw new Error("call meter should debit one minute and keep the prepaid minute");
  }

  const last = meterTick({
    elapsedSeconds: 360,
    balancePaise: 1000,
    chargedMinutes: 1,
    freeMinutes: 5,
    rupeesPerMinute: 10,
  });
  if (last.debitPaise !== 1000 || !last.warn || last.secondsRemaining !== 60) {
    throw new Error("call meter should warn on the last paid minute");
  }
}

selfCheck();

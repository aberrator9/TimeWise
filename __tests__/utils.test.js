import { expect, it, describe, expectTypeOf } from 'vitest'
import { isTomorrow, HHMM, convertTo12Hr } from '../src/utils.js'

describe('isTomorrow', () => {
  it('returns a Boolean', () => {
    expect(typeof isTomorrow(0, 1)).toBe('boolean')
  })
  it('handles a day that is tomorrow', () => {
    expect(isTomorrow(1, 2)).toBe(true)
  })
  it('handles a day that is not tomorrow', () => {
    expect(isTomorrow(1, 0)).toBe(false)
  })
  it('handles same day', () => {
    expect(isTomorrow(0, 0)).toBe(false)
  })
  it('handles end of the week', () => {
    expect(isTomorrow(6, 0)).toBe(true)
  })
})

describe('HHMM', () => {
  it('returns a string', () => {
    expect(typeof(HHMM(new Date(1979, 11, 4, 23, 59)))).toBe('string')
  })
  it('converts a date to valid 24h HH:MM format', () => {
    expect(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(HHMM(new Date(1979, 11, 4, 0, 0)))).toBe(true)
  })
  it('handles 23:59', () => {
    expect(HHMM(new Date(1979, 11, 4, 23, 59))).toBe('23:59')
  })
  it('handles negative numbers', () => {
    expect(HHMM(new Date(1979, 11, 4, -4, -3))).toBe('19:57')
  })
  it('returns midnight if null input', () => {
    expect(HHMM(null)).toBe('00:00')
  })
  it('returns midnight if non-Date input', () => {
    expect(HHMM('12:30')).toBe('00:00')
  })
})

describe('convertTo12Hr', () => {
  it('returns a string', () => {
    expect(typeof(convertTo12Hr('23:59'))).toBe('string')
  })
  it('converts a 24h timestring (HH:MM) to 12h HH:MM AM/PM', () => {
    expect(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(convertTo12Hr('23:59'))).toBe(true)
  })
  it('handles 1 min before midnight', () => {
    expect(convertTo12Hr('23:59')).toBe('11:59 PM')
  })
  it('handles midnight', () => {
    expect(convertTo12Hr('00:00')).toBe('12:00 AM')
  })
  it('handles 1 min past midnight', () => {
    expect(convertTo12Hr('00:01')).toBe('12:01 AM')
  })
  it('handles noon', () => {
    expect(convertTo12Hr('12:00')).toBe('12:00 PM')
  })
  it('clamps on negative time input', () => {
    expect(convertTo12Hr('-11:01')).toBe('12:01 AM')
  })
})
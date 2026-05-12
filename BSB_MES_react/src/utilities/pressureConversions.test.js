import { describe, it } from 'node:test';
import assert from 'node:assert';
import { convertToPSI, convertFromPSI } from './pressureConversions.js';

describe('Pressure Conversions', () => {
    it('convertToPSI should correctly multiply the value by the multiplier', () => {
        // e.g. 10 bar * 14.5038 = 145.038 psi
        assert.strictEqual(convertToPSI(10, 14.5038), 145.038);
        assert.strictEqual(convertToPSI(1, 1), 1);
        assert.strictEqual(convertToPSI(100, 0.145038), 14.5038);
    });

    it('convertFromPSI should correctly divide the value by the multiplier', () => {
        // e.g. 145.038 psi / 14.5038 = 10 bar
        assert.strictEqual(convertFromPSI(145.038, 14.5038), 10);
        assert.strictEqual(convertFromPSI(1, 1), 1);
        assert.strictEqual(convertFromPSI(14.5038, 0.145038), 100);
    });

    it('should return original value if value is null or undefined', () => {
        assert.strictEqual(convertToPSI(null, 14.5038), null);
        assert.strictEqual(convertToPSI(undefined, 14.5038), undefined);
        assert.strictEqual(convertFromPSI(null, 14.5038), null);
        assert.strictEqual(convertFromPSI(undefined, 14.5038), undefined);
    });

    it('should return original value if multiplier is null or undefined', () => {
        assert.strictEqual(convertToPSI(10, null), 10);
        assert.strictEqual(convertToPSI(10, undefined), 10);
        assert.strictEqual(convertFromPSI(10, null), 10);
        assert.strictEqual(convertFromPSI(10, undefined), 10);
    });
});

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  fahrenheitDeltaToKelvin,
  gallonsToLiters,
  pressureForcePounds,
  clamp,
  round,
} from "./units";

const approx = (a: number, b: number, eps = 1e-6) =>
  assert.ok(Math.abs(a - b) <= eps, `${a} !~= ${b}`);

test("fahrenheitToCelsius converts absolute temperatures", () => {
  approx(fahrenheitToCelsius(32), 0);
  approx(fahrenheitToCelsius(212), 100);
  approx(fahrenheitToCelsius(90), 32.2222, 1e-3);
});

test("celsiusToFahrenheit is the inverse", () => {
  approx(celsiusToFahrenheit(0), 32);
  approx(celsiusToFahrenheit(100), 212);
});

test("fahrenheitDeltaToKelvin treats intervals (no 32 offset)", () => {
  approx(fahrenheitDeltaToKelvin(9), 5);
  approx(fahrenheitDeltaToKelvin(13), 7.22222, 1e-4);
});

test("gallonsToLiters uses US liquid gallons", () => {
  approx(gallonsToLiters(1), 3.78541);
  approx(gallonsToLiters(1000), 3785.41);
});

test("pressureForcePounds multiplies by 144 in^2/ft^2", () => {
  approx(pressureForcePounds(1, 1), 144);
  approx(pressureForcePounds(1.103, 100), 1.103 * 100 * 144);
});

test("clamp bounds values", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
});

test("round respects decimals", () => {
  assert.equal(round(2.39123, 1), 2.4);
  assert.equal(round(1234.5678, 2), 1234.57);
});

'use strict';

function Thermostat() {
  this.DEFAULT_TEMP = 20;
  this.temperature = this.DEFAULT_TEMP;
  this.MIN_TEMP = 10;
  this.powerSavingMode = true;
  this.MAX_TEMP_PSM_ON = 25;
  this.MAX_TEMP_PSM_OFF = 32;
  this.LOW_USAGE_LIMIT = 18;
}

Thermostat.prototype.getTemperature = function() {
  return this.temperature;
}

Thermostat.prototype.up = function(degrees) {
  let max = this.maxTemp();
  let newTemp = this.temperature + degrees;
  this.temperature = (newTemp <= max) ? newTemp : max;
}

Thermostat.prototype.down = function(degrees) {
  let newTemp = this.temperature - degrees;
  this.temperature = (newTemp >= this.MIN_TEMP) ? newTemp : this.MIN_TEMP;
}

Thermostat.prototype.powerSavingModeOn = function()
 {
   return this.powerSavingMode;
 }

 Thermostat.prototype.switchPowerSavingModeOff = function() {
   this.powerSavingMode = false;
 }

 Thermostat.prototype.switchPowerSavingModeOn = function() {
   if (this.temperature > 25) {
     this.temperature = this.MAX_TEMP_PSM_ON;
   }
   this.powerSavingMode = true;
 }

 Thermostat.prototype.maxTemp = function() {
   return this.powerSavingMode ? this.MAX_TEMP_PSM_ON : this.MAX_TEMP_PSM_OFF;
 }

 Thermostat.prototype.reset = function() {
   this.temperature = this.DEFAULT_TEMP;
 }

 Thermostat.prototype.energyUsage = function() {
   if (this.temperature < this.LOW_USAGE_LIMIT) {
     return 'low-usage';
   } else if (this.temperature >= this.LOW_USAGE_LIMIT && this.temperature < this.MAX_TEMP_PSM_ON) {
     return 'medium-usage';
   } else {
     return 'high-usage';
   }
 }

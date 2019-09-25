'user strict';

describe('Thermostat', function() {
  var thermostat

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getTemperature()).toEqual(20);
  });

  it('increases in temperature with up()', function() {
    thermostat.up(1);
    expect(thermostat.getTemperature()).toEqual(21);
  });

  it('decreases in temperature with down()', function() {
    thermostat.down(1);
    expect(thermostat.getTemperature()).toEqual(19);
  });

  it('has a minimum temperature of 10 degrees', function() {
    thermostat.down(12);
    expect(thermostat.getTemperature()).toEqual(10);
  });

  it('has power saving mode on by default', function() {
    expect(thermostat.powerSavingModeOn()).toBe(true);
  });

  it('can switch PSM off', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.powerSavingModeOn()).toBe(false);
  });

  it('can switch PSM on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.powerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.powerSavingModeOn()).toBe(true);
  });

  describe('when power saving mode is on', function() {
    it('has a maximum temperature of 25 degress', function() {
      thermostat.up(6);
      expect(thermostat.getTemperature()).toEqual(25);
    });

    it('resets temperature to 25 if it was above that when PSM is turned on', function() {
      thermostat.switchPowerSavingModeOff();
      thermostat.up(8);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.getTemperature()).toEqual(25);
    });
  });

  describe('when power saving mode is off', function() {
    it('has a maximum temperature of 32 degress', function() {
      thermostat.switchPowerSavingModeOff();
      thermostat.up(15);
      expect(thermostat.getTemperature()).toEqual(32);
    });
  });

  it('can be reset to the default temperature', function() {
    thermostat.up(10);
    thermostat.reset();
    expect(thermostat.getTemperature()).toEqual(20);
  });

  describe('display usage level', function() {
    describe('when the temperature is below 18 degrees', function() {
      it('is considered low-usage', function() {
        thermostat.down(3);
        expect(thermostat.energyUsage()).toEqual('low-usage');
      });
    });

    describe('when the temperature is between 18 and 25 degrees', function() {
      it('is considered medium-usage', function() {
        expect(thermostat.energyUsage()).toEqual('medium-usage');
      });
    });

    describe('when the temperature is anything else', function() {
      it('is considered high-usage', function() {
        thermostat.up(6);
        expect(thermostat.energyUsage()).toEqual('high-usage');
      });
    });
  });
});

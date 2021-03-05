import '../scss/app.scss';

/* Your JS Code goes here */

/* Demo JS */
import './demo.js';
import {HOLYDAIS} from './modules/holydais/nfv.holydais.da';

global.findDates = HOLYDAIS.da.FindDates
global.getHolidays = HOLYDAIS.da.GetAllHolidaysInYear;
global.getFiveWorkDays = HOLYDAIS.da.GetFiveWorkDaysWithToday;
global.getHolidaysWithoutWeekends = HOLYDAIS.da.GetAllHolidaysWithoutWeekendInYear;
// Reference to MeeusJs  - https://github.com/Fabiz/MeeusJs
var HOLYDAIS = HOLYDAIS || {};
HOLYDAIS.da = (function() {

    const abbr = "SMTOTFL";
    const daysInDanish = {
        1: {
            dayNo: 1,
            dayName: "Mandag",
            dayNameEng: "Monday",
            bankDay: true
        },
        2: {
            dayNo: 2,
            dayName: "Tirsdag",
            dayNameEng: "Tuesday",
            bankDay: true
        },
        3: {
            dayNo: 3,
            dayName: "Onsdag",
            dayNameEng: "Wednesday",
            bankDay: true,
        },
        4: {
            dayNo: 4,
            dayName: "Torsdag",
            dayNameEng: "Thursday",
            bankDay: true,
        },
        5: {
            dayNo: 5,
            dayName: "Fredag",
            dayNameEng: "Friday",
            bankDay: true,
        },
        6: {
            dayNo: 6,
            dayName: "Lørdag",
            dayNameEng: "Saturday",
            bankDay: false,
        },
        7: {
            dayNo: 7,
            dayName: "Søndag",
            dayNameEng: "Sunday",
            bankDay: false,
        }

    }
    const months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];
    const Events = [
        {"danish": "Nytårsdag", "latin": "Circumcisio domini", "holliday": true, "primary": true},
        {"danish": "Helligtrekongersdag", "latin": "Epiphania", "holliday": false, "primary": false},
        {"danish": "1. s e Helligtrek.", "latin": "1 p. Epiphany", "holliday": true, "primary": false},
        {"danish": "2. s e Helligtrek.", "latin": "2 p. Epiphany", "holliday": true, "primary": false},
        {"danish": "3. s e Helligtrek.", "latin": "3 p. Epiphany", "holliday": true, "primary": false},
        {"danish": "4. s e Helligtrek.", "latin": "4 p. Epiphany", "holliday": true, "primary": false},
        {"danish": "5. s e Helligtrek.", "latin": "5 p. Epiphany", "holliday": true, "primary": false},
        {"danish": "6. s e Helligtrek.", "latin": "6 p. Epiphany", "holliday": true, "primary": false},
        {"danish": "Alle Helgensdag", "latin": "Omnium Sanctorum", "holliday": false, "primary": true},
        {"danish": "Mortensdag", "latin": "Morten Bisp", "holliday": false, "primary": true},
        {"danish": "1. søndag i Advent", "latin": "Adventus", "holliday": true, "primary": true},
        {"danish": "2. søndag i Advent", "latin": "2 Adventus", "holliday": true, "primary": true},
        {"danish": "3. søndag i Advent", "latin": "3 Adventus", "holliday": true, "primary": true},
        {"danish": "4. søndag i Advent", "latin": "4 Adventus", "holliday": true, "primary": true},
        {"danish": "Juledag", "latin": "Natio Christi", "holliday": true, "primary": true},
        {"danish": "2. Juledag", "latin": "Sanct Stefan", "holliday": true, "primary": true},
        {
            "danish": "9 søn før påske",
            "latin": "Septuagesima",
            "holliday": true,
            "primary": false,
            "easterDiffDays": -63
        },
        {
            "danish": "8 søndag før påske",
            "latin": "Sexagesima",
            "holliday": true,
            "primary": false,
            "easterDiffDays": -56
        },
        {
            "danish": "Fastelavnsøndag",
            "latin": "Quinquagesima",
            "holliday": true,
            "primary": true,
            "easterDiffDays": -49
        },
        {
            "danish": "Hvide tirsdag",
            "latin": "Carnem Levare",
            "holliday": false,
            "primary": false,
            "easterDiffDays": -47
        },
        {"danish": "Askeonsdag", "latin": "Caput Jejunii", "holliday": false, "primary": false, "easterDiffDays": -46},
        {
            "danish": "6 søn f Påske ",
            "latin": "Quadragesima, Invocavit",
            "holliday": true,
            "primary": false,
            "easterDiffDays": -42
        },
        {"danish": "5 søn f Påske ", "latin": "Reminiscere", "holliday": true, "primary": false, "easterDiffDays": -35},
        {"danish": "4 søn f Påske ", "latin": "Oculi", "holliday": true, "primary": false, "easterDiffDays": -28},
        {"danish": "Midfaste", "latin": "Laetare", "holliday": true, "primary": false, "easterDiffDays": -21},
        {"danish": "2 søn f Påske ", "latin": "Judica", "holliday": true, "primary": false, "easterDiffDays": -14},
        {"danish": "Palmesøndag", "latin": "Palmarum", "holliday": true, "primary": true, "easterDiffDays": -7},
        {"danish": "Skærtorsdag", "latin": "Viridium", "holliday": true, "primary": true, "easterDiffDays": -3},
        {
            "danish": "Langfredag",
            "latin": "Dies Adoratis, Passiones",
            "holliday": true,
            "primary": true,
            "easterDiffDays": -2
        },
        {"danish": "Påskedag", "latin": "Pascha", "holliday": true, "primary": true, "easterDiffDays": 0},
        {"danish": "2. påskedag ", "latin": "2. Pascha", "holliday": true, "primary": true, "easterDiffDays": 1},
        {
            "danish": "1. søn e Påske",
            "latin": "Quasimodogeniti",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 7
        },
        {
            "danish": "2. søn e Påske",
            "latin": "Misericordia ",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 14
        },
        {"danish": "3. søn e Påske", "latin": "Jubilate", "holliday": true, "primary": false, "easterDiffDays": 21},
        {"danish": "Store Bededag", "latin": "Metonoia", "holliday": true, "primary": true, "easterDiffDays": 26},
        {"danish": "4. søn e Påske", "latin": "Cantate", "holliday": true, "primary": false, "easterDiffDays": 28},
        {
            "danish": "5. søn e Påske",
            "latin": "Vocem jucunditatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 35
        },
        {
            "danish": "Kr Himmelfart",
            "latin": "Ascensionis Domini",
            "holliday": true,
            "primary": true,
            "easterDiffDays": 39
        },
        {"danish": "6. søn e Påske", "latin": "Exaudi", "holliday": true, "primary": false, "easterDiffDays": 42},
        {"danish": "Pinsedag", "latin": "Pentecoste", "holliday": true, "primary": true, "easterDiffDays": 49},
        {"danish": "2. Pinsedag", "latin": "2. Pentecoste", "holliday": true, "primary": true, "easterDiffDays": 50},
        {"danish": "Trinitatis", "latin": "Trinitatis", "holliday": true, "primary": false, "easterDiffDays": 56},
        {
            "danish": "1. søn e trin.",
            "latin": "1 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 63
        },
        {
            "danish": "2. søn e trin.",
            "latin": "2 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 70
        },
        {
            "danish": "3. søn e trin.",
            "latin": "3 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 77
        },
        {
            "danish": "4. søn e trin.",
            "latin": "4 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 84
        },
        {
            "danish": "5. søn e trin.",
            "latin": "5 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 91
        },
        {
            "danish": "6. søn e trin.",
            "latin": "6 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 98
        },
        {
            "danish": "7. søn e trin.",
            "latin": "7 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 105
        },
        {
            "danish": "8. søn e trin.",
            "latin": "8 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 112
        },
        {
            "danish": "9. søn e trin.",
            "latin": "9 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 119
        },
        {
            "danish": "10. søn e trin.",
            "latin": "10 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 126
        },
        {
            "danish": "11. søn e trin.",
            "latin": "11 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 133
        },
        {
            "danish": "12. søn e trin.",
            "latin": "12 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 140
        },
        {
            "danish": "13. søn e trin.",
            "latin": "13 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 147
        },
        {
            "danish": "14. søn e trin.",
            "latin": "14 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 154
        },
        {
            "danish": "15. søn e trin.",
            "latin": "15 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 161
        },
        {
            "danish": "16. søn e trin.",
            "latin": "16 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 168
        },
        {
            "danish": "17. søn e trin.",
            "latin": "17 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 175
        },
        {
            "danish": "18. søn e trin.",
            "latin": "18 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 182
        },
        {
            "danish": "19. søn e trin.",
            "latin": "19 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 189
        },
        {
            "danish": "20. søn e trin.",
            "latin": "20 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 196
        },
        {
            "danish": "21. søn e trin.",
            "latin": "21 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 203
        },
        {
            "danish": "22. søn e trin.",
            "latin": "22 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 210
        },
        {
            "danish": "23. søn e trin.",
            "latin": "23 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 217
        },
        {
            "danish": "24. søn e trin.",
            "latin": "24 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 224
        },
        {
            "danish": "25. søn e trin.",
            "latin": "25 p. Trinitatis",
            "holliday": true,
            "primary": false,
            "easterDiffDays": 231
        },
        {
            "danish": "Mariæ Bebudelse",
            "latin": "Mariæ Bebudelse",
            "holliday": false,
            "primary": false,
            "easterDiffDays": -14
        },
        {"danish": "Kyndelmisse", "latin": "Kyndelmisse", "holliday": false, "primary": false}
    ];


    /**
     * Pad enkeltciffer til dobbeltciffer ( 1 -> "01")
     */
    const padout = function _padout(number) {
        return (number < 10) ? '0' + number : number;
    }


    /**
     * Er året et skudår
     */
    const leapYear = function _leapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }


    /**
     * Tilføj angivne antal dage til Date-objekt
     */
    Date.prototype.addDays = function (dayOffset) {
        let _date = new Date();
        let millisecondOffset = dayOffset * 24 * 60 * 60 * 1000;
        _date.setTime(this.getTime() + millisecondOffset);
        return _date;
    };

    const getAllHolidaysInYear = function _getAllHolidaysInYear() {
        let _date = new Date();
        let arr = findDates(_date.getFullYear());
        return arr.filter(date => date["holliday"] === true);
    }
    const getAllHolidaysWithoutWeekendInYear = function _getAllHolidaysWithoutWeekendInYear() {
        let _date = new Date();
        let arr = findDates(_date.getFullYear())
        let allholidays = arr.filter(date => date["holliday"] === true);

        return allholidays.filter(isDayWeekendDay);
    }
    const getFiveWorkDaysWithToday = function _getFiveWorkDaysWithToday() {
        let weekResult = [
            {
                dayName: "",
                dayNo: 1,
                date: "",
                callBlocks: []
            }

        ];
        const _date = new Date();
        let fiveDays = [];
        let counter = 0;
        while (fiveDays.length < 5) {
            let currentDate = _date.addDays(counter);
            if (todayIsABankDayFilter(currentDate)) {
                let dateObj = {
                    dayName: daysInDanish[currentDate.getDay()].dayName,
                    dayNo: currentDate.getDay(),
                    date: currentDate
                }
                fiveDays.push(dateObj);
            }
            counter++;
        }
        return fiveDays;

    }
    const isDayWeekendDay = function (testDate) { //NOT WORKING
        let dt = new Date(testDate);
        let testDayNo = dt.getDay() === 0 ? 7 : dt.getDay();
        console.log(dt);
        let isTodayABankDay = false;
        if (daysInDanish[testDayNo].bankDay !== false) {
                isTodayABankDay = true;
        }
        return isTodayABankDay;
    };
    const todayIsABankDayFilter = function _todayIsABankDayFilter(testDate) {
        const holidays = getAllHolidaysInYear();
        const testDayNo = testDate.getDay() === 0 ? 7 : testDate.getDay();
        let isTodayABankDay = false;
        const _filtered = holidays.filter(date => date["date"] === testDate);
        if (daysInDanish[testDayNo].bankDay !== false) {
            if (_filtered.length === 0) {
                isTodayABankDay = true;
            }
        }
        return !isTodayABankDay;
    }
    /**
     *
     * Formater Date-object til eks. "2020-04-12"
     *
     */
    Date.prototype.formatDate = function () {
        let month = '' + (this.getMonth() + 1),
            day = '' + this.getDate(),
            year = this.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');

    };

    /**
     *
     *  Find ISO Ugenr for datoen
     *
     */
    Date.prototype.getWeek = function () {
        let onejan = new Date(this.getFullYear(), 0, 1);
        let millisecsInDay = 86400000;
        return Math.ceil((((this - onejan) / millisecsInDay) + onejan.getDay() + 1) / 7);
    };

    /**
     *
     * Finder datoen for den førstkommende ugedag angivet i dayOfWeek
     * dayOfWeek (0=søndag .. 6=lørdag)
     *
     */
    Date.prototype.getNextDayOfWeek = function (dayOfWeek) {
        let ret = new Date(this || new Date());
        let day = (dayOfWeek - 1 - this.getDay() + 7) % 7 + 1;
        if (day === 7) day = 0;
        ret.setDate(ret.getDate() + day);
        return ret;
    };

    const firstDayInYear = function _firstDayInYear(year) {
        if (year > 1700) {
            return new Date(year, 0, 1).getDay(); //Find ugedag 1. januar
        } else {
            return new Date(year - 1, 11, 28).getDay(); //Hvis 1700 eller ældre: træk fire dage fra for korrekt ugedag
        }
    }


    const findDates = function _findDates(year) {
        let events = JSON.parse(JSON.stringify(Events)); // Tag kopi af events
        let _easter = new Date(Easter(year)); // Find Påskesøndag

        // Find dato for alle helligdage og mærkedage, der ikke er baseret på dato for påske
        events[0].date = year + "-01-01"; //Nytårsdag
        events[1].date = year + "-01-06"; // Helligtrekonger
        // Søndage efter Helligtrekonger
        let dt = new Date(year + "-01-06").getNextDayOfWeek(0);
        let counter = 0;
        for (let ev = 2; ev < 8; ev++) {
            events[ev].date = dt.addDays(counter).formatDate();
            counter += 7;
        }
        events[8].date = new Date(year + "-11-01").getNextDayOfWeek(0).formatDate(); //Alle Helgensdag
        events[9].date = year + "-11-11"; //Mortensdag
        // Søndage i advent
        dt = new Date(year + "-11-27");
        events[10].date = dt.getNextDayOfWeek(0).formatDate(); // 1. søndag i advent (1. søndag efter 27/11)
        counter = 7;
        dt = new Date(events[10].date);
        for (let ev = 11; ev < 14; ev++) {
            events[ev].date = dt.addDays(counter).formatDate();
            counter += 7;
        }
        events[14].date = year + "-12-25"; // Juledag
        events[15].date = year + "-12-26";  //2. juledag
        for (let ev = 16; ev < 67; ev++) {  // Alle påskeafhængige mmærkedage
            events[ev].date = _easter.addDays(events[ev].easterDiffDays).formatDate();
        }

        if (year < 1771) events[67].date = year + "-03-25"; //Marie Bebudelsesdag- indt 1771 d. 25. marts, derefter søndag før palmesøndag
        else events[25].danish = "Mariæ Bebudelse"; // Skift "2. sæn. før påske" ud med "Marieæ Bebudelse"
        // events[67].date = _easter.addDays(events[67].easterDiffDays).formatDate();
        events[68].date = year + "-02-02"; //Kyndelmisse
        return events;
    }


    const Easter = function _Easter(y) {
        if (y >= 1700) {
            return GregorianEaster(y); //Gregorianske kalender indført 1.marts 1700 (altså før påskedag i året)
        } else {
            return JulianEaster(y); //Find påske efter juliansk kalender indtil 1. marts 1700
        }
    }

//Se Wikipedia: Beregning af datoen for påskedag
// https://da.wikipedia.org/wiki/P%C3%A5ske#Beregning_af_datoen_for_p%C3%A5skedag
    const GregorianEaster = function _GregorianEaster(y) {
        let Y = parseInt(y);
        let C = Math.floor(Y / 100);
        let N = Y - 19 * Math.floor(Y / 19);
        let K = Math.floor((C - 17) / 25);
        let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        let L = I - J;
        let M = 3 + Math.floor((L + 40) / 44);
        let D = Math.floor(L + 28 - 31 * Math.floor(M / 4));
        if (y === 1744) return Y + "-" + padout(3) + "-" + padout(29);
        return Y + "-" + padout(M) + "-" + padout(D); // 12-04-2020
    }


// JulianEaster baeret på J R Stocktons "The Calculation of Easter Sunday":
// https://people.cs.nctu.edu.tw/~tsaiwn/sisc/runtime_error_200_div_by_0/www.merlyn.demon.co.uk/estr-bcp.htm

    const JulianEaster = function _JulianEaster(Y) {
        Y = parseInt(Y);
        const GoldenNumber = function _GoldenNumber(Yr) {
            return Mod(Yr, 19) + 1
        }
        const Mod = function _Mod(X, Y) {
            return X - Math.floor(X / Y) * Y
        }
        const GNtoJulianPFM = function _GNtoJulianPFM(GN) { // By analogy with Gregorian data
            // Golden Number to PFM as Day-of-March, valid perpetually
            return 21 + (GN * 19 - 4) % 30
        }
        const Div = function _Div(X, Y) {
            return Math.floor(X / Y) /* full range */
        }
        const JulianSundayNumber = function _JulianSundayNumber(Y) {
            let Z = 4 + Y + Div(Y, 4)
            return 6 - Mod(Z, 7) /* 0-6 matches Sunday Letter A-G */
        }
        const JPFMtoDate2 = function _JPFMtoDate2(Year, DM) {
            let SN // Ahead to Julian Sunday
            SN = JulianSundayNumber(Year)
            return YDoMtoYMonDD(Year, SundayAfterPFM(DM, SN))
        }
        const YDoMtoYMonDD = function _YDoMtoYMonDD(Y, DM) {
            return Y + DoMtoMonDD(DM)
        }
        const DoMtoMonDD = function _DoMtoMonDD(DM) {
            return DM > 31 ? "-04-" + LZ(DM - 31) : "-03-" + DM;
        }
        const LZ = function _LZ(n) {
            return (n != null && n < 10 && n >= 0 ? "0" : "") + n
        }
        const SundayAfterPFM = function _SundayAfterPFM(DM, SN) { // plus 1..7 days to Sunday, J & G
            return DM + 1 + (60 + SN - DM) % 7 /* Day-of-March */
        }
        Y = parseInt(Y);
        let GN = GoldenNumber(Y)
        let PFM = GNtoJulianPFM(GN)
        return JPFMtoDate2(Y, PFM)
    }
    return {
        GetFiveWorkDaysWithToday: getFiveWorkDaysWithToday,
        GetAllHolidaysInYear:getAllHolidaysInYear,
        FindDates:findDates,
        GetAllHolidaysWithoutWeekendInYear:getAllHolidaysWithoutWeekendInYear
    }
}());
export {HOLYDAIS};
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var XLSX = require('xlsx');

var {logger} = require('./logger');

class utils {
    log = new logger();

    /**
     * @async Get current Date and Time
     * @returns date and time is returned in YYMMDDHHmmss format
     * @example var datetime = await utils.getTimeStamp();
     */
    async getTimeStamp() {
        var today = new Date();
        var date = today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();
        var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds() + "" + today.getMilliseconds();
        var timestamp = date + time;
        await this.log.info("Date and Time is " + timestamp);
        return timestamp;
    }
    
    /**
     * @async Get Date and Time in required format for any date as per no of days passed
     * @param NoOfDays value to be passed to fetch from current date, +ve value for future date and -ve value for past date
     * @param DateTimeFormat required format to be mentioned
     * @param requireddate  optional, if wanted to consider any other date apart from current date, can pass in this param
     * @returns date and time is returned in the mentioned format(dd mm yy HH MM ss)
     * @example var datetime = await utils.getCustomTimeStamp(-1, "dd/mm/yy", "20/12/2020"); //fetches previous day of 20th dec which is 19th dec 2020 as 19/12/2020 format
     */
    async getCustomTimeStamp(NoOfDays, DateTimeFormat, requireddate) {
        var date = new Date();
        //var amOrPm = (date.getHours() < 12) ? "AM" : "PM";
        const dateformat = require('dateformat');
        if (requireddate == null || requireddate == "") {
            await this.log.info("Required date is empty, going with current date");
        }
        else {
            date = new Date(requireddate);
        }
        await this.log.info("Current date " + date);
        date.setDate(date.getDate() + (NoOfDays));
        var formattedDateTime = dateformat(date, DateTimeFormat);
        await this.log.info("Formated date " + formattedDateTime);
        return formattedDateTime;
    }
    
    /**
     * @async Read the data from the text file
     * @param filePath path of the text file
     * @returns File content when file is found, Otherwise 'null' is returned
     * @example await utils.readFile('C:\\textfile.txt');
     */
    async readFile(filePath) {
        let data;
        try {
            data = await fs.readFileSync(filePath, 'utf8');
            await this.log.info("Data read from the file and returned");
            await this.log.info(data.toString());
            return data.toString();
        }
        catch (err) {
            await this.log.warn("Error while reading data from file " + err);
            return null;
        }
    }

    /**
     * @async creates a folder and file and writes the data to the text file, If the file is already available and has conent, it will be replaced.
     * @param filePath path of the text file
     * @param fileContent content to be written to the text file
     * @returns none
     * @example await utils.writeFile('C:\\textfile.txt', "abcdef");
     */
    async writeFile(filePath, fileContent) {
        try {
            var dirPath = filePath.substr(0, filePath.lastIndexOf("/"));
            await this.log.info("Directory path is " + dirPath);
            if (await !fs.existsSync(dirPath)) {
                await this.log.info("No dir exists, creating dir : " + dirPath);
                await fse.ensureDirSync(dirPath);
                await this.log.info("Dir created");
            }
            await this.log.info("Writing the data to file");
            await fs.writeFileSync(filePath, fileContent);
            await this.log.info("Data write happened successfully");
        }
        catch (err) {
            await this.log.warn("Error while writing data to file " + err);
        }
    }

    /**
     * @async Appends the data to the exisiting text file at the end in new line
     * @param filePath path of the text file
     * @param fileContent content to be appended to the text file
     * @returns none
     * @example await utils.appendFile('C:\\textfile.txt', "abcdef");
     */
    async appendFile(filePath, fileContent) {
        try {
            await fs.appendFileSync(filePath, "\r\n");
            await fs.appendFileSync(filePath, fileContent);
            await this.log.info("Data append happened successfully");
        }
        catch (err) {
            await this.log.warn("Error while appending data to file " + err);
            throw err;
        }
    }

    /**
     * @async returns row count from the excel file, will not consider the header row.
     * @param filepath excel file path
     * @param sheetname sheetname to be referred in the excel file
     * @returns rowcount 
     * @example utils.getrowcountfromExcel("D:\\testexcel.xlsx", "sheet1");
     */
    async getrowcountfromExcel(filepath, sheetname) {
        var rowcount = 0;
        try {
            var wb = XLSX.readFile(filepath);
            var sh = wb.Sheets[sheetname];
            var data = XLSX.utils.sheet_to_json(sh);
            rowcount = data.length;
            await this.log.info("get rowcount value " + rowcount);
        }
        catch (err) {
            await this.log.warn(err);
            rowcount = 0;
        }
        return rowcount;
    }

    /**
     * @async returns cell value from the excel file for specific row no and column name
     * @param filepath excel file path
     * @param sheetname sheetname to be referred in the excel file
     * @param cellReference input column and row references Eg: C5,A1
     * @returns cellValue
     * @example utils.getCellValueFromExcel("D:\\testexcel.xlsx", "Sheet1", "C5");
     */
    async getCellValueFromExcel(filepath, sheetname, cellReference) {
        try {
            var wb = XLSX.readFile(filepath);
            var sh = wb.Sheets[sheetname];
            var cellValue = (sh[cellReference] ? sh[cellReference].w : "");
            await this.log.info(`Cell value for [${cellReference}] is ${cellValue}`);
        }
        catch (err) {
            await this.log.warn(err);
            cellValue = "";
        }
        return cellValue;
    }

    /**
     * @async sets cell value into the excel file for specific row no(which is already existing) and column name. This method will not set data in a new row
     * @param filepath excel file path
     * @param sheetname sheetname to be referred in the excel file
     * @param cellReference input column and row references Eg: C5,A1
     * @param datatoinsert input data that needs to be inserted or replaced in the excel file from the header row
     * @returns none
     * @example utils.setCellValueIntoExcel("D:\\testexcel.xlsx", "sheet1", "C5", "dataval");
     */
    async setCellValueIntoExcel(filepath, sheetname, cellReference, datatoinsert) {
        try {
            var wb = XLSX.readFile(filepath);
            var sh = wb.Sheets[sheetname];
            XLSX.utils.sheet_add_aoa(sh, [[datatoinsert]], { origin: cellReference });
            XLSX.writeFile(wb, filepath);
        }
        catch (err) {
            await this.log.warn(err);
        }
    }

    /**
     * @async converts workbook from xls format to xlsx format. It will take input workbook in xls format and create a new workbook with the same name in xlsx format in the same location.
     * @param filepath excel file path
     * @returns It will return a file path with xlsx extension.
     * @example utils.convertXlsToXlsx("D:\\testexcel.xls");
     */
    async convertXlsToXlsx(filepath) {
        try {
            var xlsxfilepath = filepath.replace(".xls", ".xlsx")
            var newWB, newWS;
            var wb = XLSX.readFile(filepath, { cellText: false, cellDates: true });
            newWB = XLSX.utils.book_new();
            for (let i = 0, l = wb.SheetNames.length; i < l; i += 1) {
                var sheetName = wb.SheetNames[i];
                await this.log.info(sheetName);
                newWS = wb.Sheets[sheetName], { raw: false };
                XLSX.utils.book_append_sheet(newWB, newWS, sheetName);
                XLSX.writeFile(newWB, xlsxfilepath);
            }
        }
        catch (err) {
            await this.log.warn(err);
        }
        return (xlsxfilepath);

    }

    /**
     * @async add data into the excel in a new row and if the column name in the data is not present in the excel,it will craete a new column at the end and insert the data.
     * @param filepath excel file path
     * @param sheetname sheetname to be referred in the excel file
     * @param data input data that needs to be inserted as a new row in the excel. Data should be in the following array format. var data = [{ column1: "abc", Header2: "kdch" }, { Header1: "a" },{Header:"ncjwk"}];
     * @returns none
     * @example var data = [{ column1: "abc", Header2: "kdch" }, { Header1: "a" },{Header:"ncjwk"}];
     * utils.addNewRowOrColumnInExcel("D:\\testexcel.xlsx", "sheet1", 1, data);
     */
    async addNewRowOrColumnInExcel(filepath, sheetname, data) {
        try {
            var flag = false;
            let worksheets = {};
            const wb = XLSX.readFile(filepath, { cellText: false, cellDates: true });
            const sh = wb.SheetNames;
            for (const sheetName of sh) {
                if (sheetName == sheetname) {
                    worksheets[sheetname] = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { raw: false, defval: "" });
                    for (var i = 0; i < data.length; i++) {
                        worksheets[sheetname].push(data[i]);
                    }
                } else {
                    continue;
                }
            }

            XLSX.utils.sheet_add_json(wb.Sheets[sheetname], worksheets[sheetname]);
            XLSX.writeFile(wb, filepath);
        } catch (err) {
            await this.log.warn(err);
        }
    }

    /**
     * @async get cell value from the excel file for specific row number and and column header. 
     * @param filepath excel file path
     * @param sheetname sheetname to be referred in the excel file
     * @param rownum input row no in the excel file from where you want to fetch the data(Rownum equals to 1 specifies the header)
     * @param colname input column header value corresponding to which data needs to be retrieved.
     * @returns return cellValue;
     * @example utils.getCellValueFromExcelUsingColumnHeaderAndRowNumber("D:\\testexcel.xlsx", "sheet1", 2, "Column1");
     */
    async getCellValueFromExcelUsingColumnHeaderAndRowNumber(filepath, sheetname, rownum, colname) {
        var cellValue;
        try {
            if (rownum > 1) {
                var wb = XLSX.readFile(filepath, { cellText: false, cellDates: true });
                var sh = wb.Sheets[sheetname];
                var data = XLSX.utils.sheet_to_json(sh, { raw: false, defval: "" });
                cellValue = data[(rownum - 2)][colname];
                return cellValue;
            }
            else {
                await this.log.info("Please specify correct excel body row number and column header name to get the data.");
                cellValue = "";
            }
        }
        catch (err) {
            await this.log.warn(err);
            await this.log.warn("Please check whether correct row number and column header name provided.The row number should be in the size of the excel");

        }
        return cellValue;
    }

    /**
     * @async sets cell value into the excel file for specific row no(which is already existing) and column name. This method will not set data in a new row
     * @param filepath excel file path
     * @param sheetname sheetname to be referred in the excel file
     * @param rownum input row no in the excel file - starts with index 1, without considering header row
     * @param colname input column name in the excel file from the header row
     * @param datatoinsert input data that needs to be inserted or replaced in the excel file from the header row
     * @returns none
     * @example utils.setCellValueIntoExcelUsingColumnHeaderAndRowNumber("D:\\testexcel.xlsx", "sheet1", 1, "Column1", "dataval");
     */
     async setCellValueIntoExcelUsingColumnHeaderAndRowNumber(filepath, sheetname, rownum, colname, datatoinsert) {
        try {
            var count = 0, rowno = rownum, colname = colname, value;
            const header = [];
            var wb = XLSX.readFile(filepath, { cellText: false, cellDates: true });
            var sh = wb.Sheets[sheetname];
            const columnCount = XLSX.utils.decode_range(sh['!ref']).e.c + 1;
            for (let i = 0; i < columnCount; ++i) {
                header[i] = sh[`${XLSX.utils.encode_col(i)}1`];
            }
            for (let i = 0; i < header.length; i++) {
                if (header[i].v == colname) {
                    count++;
                }
            }
            if (count == 1) {
                var data = XLSX.utils.sheet_to_json(sh, { raw: false, defval: "" });
                value = data[(rowno - 1)][colname];
                //await this.log.info(value);

                data[(rowno - 1)][colname] = datatoinsert;
                //await this.log.info(data);
                XLSX.utils.sheet_add_json(sh, data, {
                    //skipHeader: true,
                    // append to bottom of worksheet starting on first column
                });
                XLSX.writeFile(wb, filepath);
            }
            else {
                await this.log.info("No such column " + colname + " present in excel");
            }
        }
        catch (err) {
            await this.log.warn(err);
        }
    }

    /**
     * @async Send Mail
     * @param from:        Sender mail address
     * @param to:          Comma separated list of recipients
     * @param cc:          Comma separated list of recipients
     * @param bcc:         Comma separated list of recipients
     * @param subject:     Subject of the message
     * @param text:        plaintext body
     * @param attachments: An array of attachments e.g. let attachements ={ filename: 'new.html', path: 'C:/Desktop/new.html'} or just ""
     * @param body:        HTML body     * 
     * @example ** let attachements ={ filename: 'text3.txt', path: 'D:/nodemail/pass.txt'}
     *   sendMail('from emailID','to Email ID','CC email ID or "" ','bcc email ID or "" ','Email Subject','Plan Text Body','Attachments Array List',"HTML BODY");
     */

    async sendMail(from, to, cc = null, bcc = null, subject, text = null, attachments = null, body = null) {

        let mailOptions = {
            from: from,                     // sender mail address
            to: to,                         // Comma separated list of recipients
            cc: cc,                         // Comma separated list of recipients
            bcc: bcc,                       // Comma separated list of recipients
            subject: subject,               // Subject of the message
            text: text,                     // plaintext body
            attachments: attachments,       // An array of attachments
            html: body                      // HTML body
        };


        let transportObj = {
            host: 'internal-mail-router.email.com',
            port: 25,
            secure: false,
            auth: {
                user: 'dummymail@email.com',
                pass: 'password'
            },
            tls: {
                rejectUnauthorized: false
            }
        };


        let transporter = await nodemailer.createTransport(transportObj);

        transporter.sendMail(mailOptions, async function (error, info) {
            try {
                if (error) {
                    await this.log.warn("Email Not sent and the Error is " + error);

                } else {
                    await this.log.info('Email Sent Sucessfully : ' + info.response);

                }
            }

            catch (err) {
                await this.log.warn("Error occured while sending email and the error is :" + err);
                throw (err);
            }
        });
    }

    /**
     * @async Pause execution for the specified time in seconds. This doesn't depend on selenium web driver
     * @param seconds no of seconds to pause the execution
     * @example await app.utils.waitForSeconds(5);
     */
    async waitForSeconds(seconds) {
        await this.log.info("Wait for "+seconds+ " seconds");
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    }

    /**
     * @async Read CSV data and return the data in json object
     * @param filePath provide the csv file path
     * @param headerAvailable provide true if header available else false, by default it will be true
     * @param delimiterValue provide delimiter used to separate data, by default it will comma(,)
     * @returns results.data object which contains data of csv file. 
     * @example await utils.readDataFromCSV("D:\test.csv", false, ":");
     * @example let results = await utils.readDataFromCSV("D:\test.csv");
                for(let i=0; i<results.length; i++){
                    await this.log.info(results[i]["ColumnName"])
                }
     */
    async readDataFromCSV(filePath, headerAvailable = true, delimiterValue = ",") {
        const file = fs.readFileSync(filePath, 'utf8');
        let results = papa.parse(file, {
            header: headerAvailable,
            comments: "#",
            delimiter: delimiterValue
        });
        return results.data;
    }

    /**
     * @async get particular cell value from CSV data file
     * @param filePath provide the csv file path
     * @param rowNo provide the row number to fetch data. row index starts with 0
     * @param colName provide the column name to fetch data, in case of no header pass col index which starts with 0
     * @param headerAvailable provide true if header available else false, by default it will be true
     * @param delimiterValue provide delimiter used to separate data, by default it will comma(,)
     * @returns result object which contains data of csv file. To access call results.data[];
     * @example await app.utils.getCellValueFromCSV("D:\test.csv", 0, 1, false, ":");
     * @example await app.utils.getCellValueFromCSV("D:\test.csv", 1, "colname");
     */
    async getCellValueFromCSV(filePath, rowNo, colName, headerAvailable = true, delimiterValue = ",") {
        let results = await this.readDataFromCSV(filePath, headerAvailable, delimiterValue);
        return results[rowNo][colName];
    }

    /**
     * @async get particular cell value from CSV data file
     * @param filePath provide the csv file path
     * @param data provide json data which is modified to write into csv file
     * @param delimiterValue provide delimiter used to separate data, by default it will comma(,)
     * @param headerAvailable provide true if header available else false, by default it will be true
     * @returns result object which contains data of csv file. To access call results.data[];
     * @example await app.utils.writeDataToCSV("D:\test.csv", Data in JSON format, ":", false);
     * @example await app.utils.readDataFromCSV("D:\test.csv", Data in JSON format);
     * @see writeFile(filePath: string, fileContent: string) function  to write file simply
     */
    async writeDataToCSV(filePath, data, delimiterValue = ",", headerAvailable = true) {
        var csv = papa.unparse(data, {
            header: headerAvailable,
            delimiter: delimiterValue
        });
        await fs.writeFileSync(filePath, csv);
    }

    /**
     *  @async This method checks if the file exists or not and returns boolean true or false.
     *  @param filePath 
     *  @returns boolean true or false - File Exists or not
     *  @example await utils.fileExists("C:/filepath.txt");
     */
    async fileExists(filePath) {
        let exists = false;
        if (fs.existsSync(filePath)) {
            exists = true;
        }
        return exists
    }

    /**
     * @async Get Date and Time in required format for any date as per no of minutes added to the time
     * @param NoOfMinutes value to be passed to fetch from current date, +ve value for future Minutes and -ve value for past Minutes
     * @param DateTimeFormat required format to be mentioned
     * @param requireddate  optional, if wanted to consider any other date apart from current date, can pass in this param
     * @returns date and time is returned in the mentioned format(dd mm yy HH MM ss)
     * @example var datetime = await utils.setMinutesToTimeStamp(30, "yyyy-mm-dd HH:MM:ss", "2022-12-20 12:00:00"); //adds 30 minutes to the time and return in the required format 2022-12-20 12:30:00
     */
     async setMinutesToTimeStamp(NoOfMinutes, DateTimeFormat, requireddate) {
        var date = new Date();
        //var amOrPm = (date.getHours() < 12) ? "AM" : "PM";
        const dateformat = require('dateformat');
        if (requireddate == null || requireddate == "") {
            await this.log.info("Required date is empty, going with current date");
        }
        else {
            date = new Date(requireddate);
        }
        await this.log.info("Current date " + date);
        date.setMinutes(date.getMinutes() + NoOfMinutes);
        var formattedDateTime = dateformat(date, DateTimeFormat);
        await this.log.info("Formated date and Time " + formattedDateTime);
        return formattedDateTime;
    }
    
    async readJSONFile(filePath) {
        try {
          const absoluteFilePath = path.resolve(filePath);
          const data = fs.readFileSync(absoluteFilePath, 'utf8');
          const jsonData = JSON.parse(data);
          return jsonData;
        } catch (error) {
          console.error('Error:', error);
          return null; // Return null or handle the error as needed
        }
      }

    //update json with parameters
    async updateJson(){
        const jsondata = require('./testdata.json');
        console.log(jsondata);
        // jsondata.options[1].test1 = "date";
        
        // console.log(jsondata);
        console.log(jsondata.options[1].test1);
        var originalMsg = JSON.stringify(jsondata);
        var updatedMsg = originalMsg.replace(/time/g, "N/A");
        var newjsondata = JSON.parse(updatedMsg);
        
        console.log(newjsondata);
        console.log(newjsondata.options[1].test1);
    }

    async printMapData(map){
        map.forEach((value, key) => {
            this.log.info(key + ': ' + value);
          });
    }
}
exports.utils = utils;
import { StructuredQueryLanguageConverter } from "../../src/converters/sql.converter";
import { IDataLocalizedMessages } from "../../src/model/database";
import * as fs from "fs";
import * as chai from "chai";

const sqlConverter = new StructuredQueryLanguageConverter();

describe("SQL Converter", () => {
    describe("#writeToFile simpleExample", () => {
        it("should have new localized message written", async () => {
            let fileName = "./test/mocks/simpleExample/mock.default.ts";
            let localizedMessage: IDataLocalizedMessages = {localizedMessageName: "test.test1#test",
                                                            localizedMessageText: "ok",
                                                            cultureName: "en-US"};
            let path = await sqlConverter.writeToFile(localizedMessage, null, fileName).then((output: string) => { return output; });

            fs.readFile(fileName, function (err, data) {
                chai.expect(fileName).to.exist;
                chai.expect(data.toString()).to.include(`test: "ok"`);
            });
            chai.expect(path).to.be.equal(fileName);
        });
    });
    describe("#writeToFile multilineExample", () => {
        it("should have new localized message written", async () => {
            let fileName = "./test/mocks/multilineExample/mock.default.ts";
            let localizedMessage: IDataLocalizedMessages = {localizedMessageName: "test.test1#test",
                                                            localizedMessageText: `New multiline test" + \n"another line`,
                                                            cultureName: "en-US"};
            let path = await sqlConverter.writeToFile(localizedMessage, null, fileName).then((output: string) => { return output; });

            fs.readFile(fileName, function (err, data) {
                chai.expect(fileName).to.exist;
            });
            chai.expect(path).to.equal(fileName);
        });
    });
    describe("#writeToFile multilevelExample", () => {
        it("should have new localized message written", async () => {
            let fileName = "./test/mocks/multilevelExample/mock.default.ts";
            let localizedMessage: IDataLocalizedMessages = {localizedMessageName: "test123.test1234#test.test1.test2",
                                                            localizedMessageText: "ok",
                                                            cultureName: "en-US"};
            let path = await sqlConverter.writeToFile(localizedMessage, null, fileName).then((output: string) => { return output; });

            fs.readFile(fileName, function (err, data) {
                chai.expect(fileName).to.exist;
                chai.expect(data.toString()).to.include(`test2: "ok"`);
            });
            chai.expect(path).to.equal(fileName);
        });
    });
});
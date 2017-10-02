import * as chai from "chai";
import * as path from "path";
import { Package } from "../../src/model/package";
import { TypescriptParser } from "../../src/parsers/typescript.parser";
import { PoWriter } from "../../src/writers/po.writer";

let chaiString = require("chai-string");
chai.use(chaiString);

describe("Portable Object writer", () => {

    it("should parse duplicatedTextWithoutTranslationExample", () => {
        const mocksPaths = [
            path.join(__dirname, "../mocks/duplicatedTextWithoutTranslationExample/mock1.default.ts"),
            path.join(__dirname, "../mocks/duplicatedTextWithoutTranslationExample/mock1.pt-PT.ts"),
            path.join(__dirname, "../mocks/duplicatedTextWithoutTranslationExample/mock2.default.ts"),
            path.join(__dirname, "../mocks/duplicatedTextWithoutTranslationExample/mock2.pt-PT.ts")
        ];

        let ts = new TypescriptParser("test", mocksPaths);
        let pack = ts.run();

        chai.expect(pack.files).to.have.length(2);

        let po = new PoWriter(pack, "pt-PT");
        let output = po.run();

        chai.expect(output).to.exist;
        chai.expect(output).to.have.length(1);
    });

});
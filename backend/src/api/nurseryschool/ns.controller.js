"use strict"

const xlsx = require('xlsx');
const multiparty = require('multiparty');
const { store } = require('./ns.repository');

// 조회 관련 모든 API 통합
exports.find = async ( options ) => {
    const querystring = req.query;
    console.log(querystring);

    const { success , message, data, error } = await findByOptions( querystring );
    success === true ? 
    res.status(200).json({ message: message , data : data }) : 
    res.status(500).json({ message: message , error : error });
}

// 엑셀로 포스팅
exports.postByExcel = async ( req, res ) => {
    const excel = {};
    
    const form = new multiparty.Form({
        autoFiles: true,
    });

    form.on('file', (name, file) => {
        const workbook = xlsx.readFile(file.path);
        const sheetnames = Object.keys(workbook.Sheets);
        let i = sheetnames.length;
        while (i--) {
            const sheetname = sheetnames[i];
            console.log(sheetname);
            excel.data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
        }
    });
    
    form.on('close', async () => {
        const result = await store( excel.data );
        res.send(result);
    });

    form.parse(req);
}

// 삭제
exports._delete = async ( req, res ) => {
    res.status(200).json({ message:"test", data:"data"});
}

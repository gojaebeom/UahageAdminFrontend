"use strict"

const { query } = require("../../config/database");

exports.find = async ( options ) => {
    const { select, selectType, whereColumn, whereData } = options;

    let SQL =`select ${select} from spaces where space_code = 3`;
    if(whereColumn && whereData) SQL = `select ${select} from users where space_code = 3 and ${whereColumn} = ?;`;

    return await query(SQL, [ whereData ])
        .then( data => { 
            if( selectType === "boolean" )
                if( data.length === 0 ) return { success : true, message : "finded successfully", data : false};
                else  return { success : true, message : "finded successfully", data : true};
            else{
                return { success : true, message : "finded successfully", data : data};
            }
        })
        .catch( err => {
            console.log(err.errno);
            if(err.errno === 1054) return { success : false, message : err.sqlMessage, error : err ,code : 404 };
            return { success : false, message : "Could not find data", error : err };
        });
}

exports.store = async ( body ) => {
    const space_code = 3;
    let SQL = `
    insert into 
    spaces( space_code, space_name, addr, phone, lat, lon, add_info )`;

    for(let item of body) {
        console.log(item);
        SQL += `values( 
            ${space_code}, '${item["어린이집명"]}', '${item["주소"]}', '${item["어린이집전화번호"]}', ${item["위도"]}, ${item["경도"]}, 
            json_object( 
                "bus",'${item["통학차량운영여부"]}',
                "homepage",'${item["홈페이지주소"]}',
                "teachers", '${item["보육교직원수"]}',
                "rooms",'${item["보육실수"]}'
            )
        )`;
    }
    await query( SQL )
        .then( data => { 
            console.log( data );
            return { success : true, message : "created successfully", data : data};
        })
        .catch( err => {
            console.log( err );
            return { success : false, message : "Could not create", error : err };
        });
}
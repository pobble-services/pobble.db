const fs = require(`fs`);
function Database(File){
    try {
        if(!File.includes(`.txt`)) File += `.txt`;
        let Dir = File.substring(0, File.lastIndexOf('/'));
        if(!fs.existsSync(Dir)){
            if(Dir !== ``){
                fs.mkdirSync(Dir, { recursive: true });
            }
        }
        if(!fs.existsSync(File)){
            fs.writeFileSync(File, ``);
        }
        let DATABASE = fs.readFileSync(File, `utf-8`);
        if(!DATABASE){
            fs.writeFileSync(File, ``);
        }
        return {
            set(Key, Value){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(typeof(Key) === `object`){
                    Value = Key.Value;
                    Key = Key.Key;
                }
                if(!Key) throw new TypeError(`Key not found`);
                if(Value === undefined) throw new TypeError(`Value not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let valueType = typeof(Value);
                if(Array.isArray(Value)){
                    valueType = `array`;
                    Value = JSON.stringify(Value);
                } else if(valueType === `object`){
                    Value = JSON.stringify(Value);
                } else {
                    Value = Value.toString();
                }
                let DATE = new Date();
                DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let newData = `${DATE}|Key-${Key}|Value-${Value}|Type-${valueType}`;
                if(regex.test(DATABASE)){
                    DATABASE = DATABASE.replace(regex, newData);
                } else {
                    DATABASE += `\n${newData}`;
                }
                let Dir = File.substring(0, File.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }        
                fs.writeFileSync(File, DATABASE.trim());
            },
            get(Key){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(!Key) throw new TypeError(`Key not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                if(match){
                    match = match[0].split(`|`);
                    let Value = match[2].split(`Value-`)[1];
                    let Type = match[3].split(`Type-`)[1];
            
                    if(Type === `array` || Type === `object`){
                        Value = JSON.parse(Value);
                    } else if(Type === `boolean`){
                        Value = (Value === `true`);
                    } else if(Type === `number`){
                        Value = Number(Value);
                    } else if(Type === `bigint`){
                        Value = BigInt(Value);
                    } else if(Type === `undefined`){
                        Value = undefined;
                    } else if(Type === `null`){
                        Value = null;
                    } else {
                        Value = Value.toString();
                    }
            
                    return {
                        Date: {
                            Year: match[0].split(`:`)[0],
                            Month: match[0].split(`:`)[1],
                            Day: match[0].split(`:`)[2],
                            Hours: match[0].split(`:`)[3],
                            Minutes: match[0].split(`:`)[4],
                            Seconds: match[0].split(`:`)[5],
                            Full: match[0]
                        },
                        Data: {
                            Key: match[1].split(`Key-`)[1],
                            Value: {
                                Data: Value,
                                Type: Type
                            }
                        }
                    };
                } else {
                    return undefined;
                }
            },
            delete(Key){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(!Key) throw new TypeError(`Key not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                if(regex.test(DATABASE)){
                    let match = DATABASE.match(regex);
                    DATABASE = DATABASE.replace(`\n${match[0]}`, ``);
                } else throw new TypeError(`Data not found`);
                let Dir = File.substring(0, File.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }
                fs.writeFileSync(File, DATABASE.trim());
            },
            has(Key, Value){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(typeof(Key) === `object`){
                    Value = Key.Value;
                    Key = Key.Key;
                }
                if(!Key) throw new TypeError(`Key not found`);
                if(Value === undefined) throw new TypeError(`Value not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let valueType = typeof(Value);
                if(Array.isArray(Value)){
                    valueType = `array`;
                    Value = JSON.stringify(Value);
                } else if(valueType === `object`){
                    Value = JSON.stringify(Value);
                } else {
                    Value = Value.toString();
                }
                Value = Value.toString();
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                let has = false;
                if(match){
                    match = match[0].split(`|`);
                    let Type = match[3].split(`Type-`)[1] ?? `string`;
                    if(valueType !== Type) return false;
                    let Value2 = match[2].split(`Value-`)[1] ?? `0`;
                    if(Value2 === Value) has = true;
                }
                return has;
            },
            add(Key, Value){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(typeof(Key) === `object`){
                    Value = Key.Value;
                    Key = Key.Key;
                }
                if(!Key) throw new TypeError(`Key not found`);
                if(Value === undefined) throw new TypeError(`Value not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let DATE = new Date();
                DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                if(match){
                    match = match[0].split(`|`);
                    let Value2 = match[2].split(`Value-`)[1] || `0`;
                    let Type = match[3].split(`Type-`)[1];
                    if(Type !== `number`) throw new TypeError(`Data is not a number`);
                    Value = Number(Value);
                    Value2 = Number(Value2);
                    Value = Value2 + Value;
                }
                let newData = `${DATE}|Key-${Key}|Value-${Value.toString()}|Type-${valueType}`;
                if(regex.test(DATABASE)){
                    DATABASE = DATABASE.replace(regex, newData);
                } else {
                    DATABASE += `\n${newData}`;
                }
                let Dir = File.substring(0, File.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }
                fs.writeFileSync(File, DATABASE.trim());
            },
            subtraction(Key, Value){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(typeof(Key) === `object`){
                    Value = Key.Value;
                    Key = Key.Key;
                }
                if(!Key) throw new TypeError(`Key not found`);
                if(Value === undefined) throw new TypeError(`Value not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let DATE = new Date();
                DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                if(match){
                    match = match[0].split(`|`);
                    let Value2 = match[2].split(`Value-`)[1] || `0`;
                    let Type = match[3].split(`Type-`)[1];
                    if(Type !== `number`) throw new TypeError(`Data is not a number`);
                    Value = Number(Value);
                    Value2 = Number(Value2);
                    Value = Value2 - Value;
                }
                let newData = `${DATE}|Key-${Key}|Value-${Value.toString()}|Type-${valueType}`;
                if(regex.test(DATABASE)){
                    DATABASE = DATABASE.replace(regex, newData);
                } else {
                    DATABASE += `\n${newData}`;
                }
                let Dir = File.substring(0, File.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }        
                fs.writeFileSync(File, DATABASE.trim());
            },
            push(Key, Value){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(typeof(Key) === `object`){
                    Value = Key.Value;
                    Key = Key.Key;
                }
                if(!Key) throw new TypeError(`Key not found`);
                if(Value === undefined) throw new TypeError(`Value not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let DATE = new Date();
                DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                if(match){
                    match = match[0].split(`|`);
                    let Value2 = match[2].split(`Value-`)[1] || `[]`;
                    let Type = match[3].split(`Type-`)[1];
                    if(Type !== `array`) throw new TypeError(`Data is not an array`);
                    Value2 = JSON.parse(Value2);
                    Value2.push(Value);
                    Value = Value2;
                } else {
                    Value = [Value];
                }
                let newData = `${DATE}|Key-${Key}|Value-${JSON.stringify(Value)}|Type-array`;
                if(regex.test(DATABASE)){
                    DATABASE = DATABASE.replace(regex, newData);
                } else {
                    DATABASE += `\n${newData}`;
                }
                let Dir = File.substring(0, File.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }        
                fs.writeFileSync(File, DATABASE.trim());
            },
            pull(Key, Value){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(typeof(Key) === `object`){
                    Key = Key.Key;
                    Value = Value.Key;
                }
                if(!Key) throw new TypeError(`Key not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                if(Value === undefined) throw new TypeError(`Value not found`);
                let DATE = new Date();
                DATE = `${DATE.getFullYear()}:${String(DATE.getMonth() + 1).padStart(2, `0`)}:${String(DATE.getDate()).padStart(2, `0`)}:${String(DATE.getHours()).padStart(2, `0`)}:${String(DATE.getMinutes()).padStart(2, `0`)}:${String(DATE.getSeconds()).padStart(2, `0`)}`;
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                if(match){
                    match = match[0].split(`|`);
                    let Value2 = match[2].split(`Value-`)[1] || `[]`;
                    let Type = match[3].split(`Type-`)[1];
                    if(Type !== `array`) throw new TypeError(`Data is not an array`);
                    Value2 = JSON.parse(Value2);
                    if(Value2.length === 0) return;
                    Value2 = Value2.filter(Item => {
                        if(typeof Item === `string`){
                            if(Item === Value) return;
                        } else if(typeof Item === `number`){
                            if(Number(Item) === Value) return;
                        } else if(typeof Item === `boolean`){
                            if(Boolean(Item) === Value) return;
                        } else if(typeof Item === `object` && !Array.isArray(Item)){
                            if(JSON.stringify(Item) === JSON.stringify(Value)) return;
                        } else if(Array.isArray(Item)){
                            if(JSON.stringify(Item) === JSON.stringify(Value)) return;
                        }
                        return true;
                    });
                    let newData = `${DATE}|Key-${Key}|Value-${JSON.stringify(Value2)}|Type-array`;
                    DATABASE = DATABASE.replace(regex, newData);
                    let Dir = File.substring(0, File.lastIndexOf('/'));
                    if(!fs.existsSync(Dir)){
                        if(Dir !== ``){
                            fs.mkdirSync(Dir, { recursive: true });
                        }
                    }
                    fs.writeFileSync(File, DATABASE.trim());
                } else {
                    throw new TypeError(`Data is not found`);
                }
            },
            allKeys(){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                let Keys = [];
                let Array = DATABASE.split(`\n`);
                if(!Array[0].length || Array[0].length <= 0) return undefined;
                for (let Data of Array){
                    Data = Data.split(`|`);
                    Keys.push(Data[1].split(`Key-`)[1]);
                }
                return Keys;
            },
            allValues(){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                let Values = [];
                let Array = DATABASE.split(`\n`);
                if(!Array[0].length || Array[0].length <= 0) return undefined;
                for (let Data of Array){
                    Data = Data.split(`|`);
                    let Value = Data[2].split(`Value-`)[1];
                    let Type = Data[3].split(`Type-`)[1];
                    if(Type === `array` || Type === `object`){
                        Value = JSON.parse(Value);
                    } else if(Type === `boolean`){
                        Value = (Value === `true`);
                    } else if(Type === `number`){
                        Value = Number(Value);
                    } else if(Type === `bigint`){
                        Value = BigInt(Value);
                    } else if(Type === `undefined`){
                        Value = undefined;
                    } else if(Type === `null`){
                        Value = null;
                    } else {
                        Value = Value.toString();
                    }
                    Values.push(Value);
                }
                return Values;
            },
            all(){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                let DATA = [];
                let Array = DATABASE.split(`\n`);
                if(!Array[0].length || Array[0].length <= 0) return undefined;
                for (let Data of Array){
                    Data = Data.split(`|`);
                    let Value = Data[2].split(`Value-`)[1];
                    let Type = Data[3].split(`Type-`)[1];
                    if(Type === `array` || Type === `object`){
                        Value = JSON.parse(Value);
                    } else if(Type === `boolean`){
                        Value = (Value === `true`);
                    } else if(Type === `number`){
                        Value = Number(Value);
                    } else if(Type === `bigint`){
                        Value = BigInt(Value);
                    } else if(Type === `undefined`){
                        Value = undefined;
                    } else if(Type === `null`){
                        Value = null;
                    } else {
                        Value = Value.toString();
                    }
                    DATA.push({
                        Date: {
                            Year: Data[0].split(`:`)[0],
                            Month: Data[0].split(`:`)[1],
                            Day: Data[0].split(`:`)[2],
                            Hours: Data[0].split(`:`)[3],
                            Minutes: Data[0].split(`:`)[4],
                            Seconds: Data[0].split(`:`)[5],
                            Full: Data[0]
                        },
                        Data: {
                            Key: Data[1].split(`Key-`)[1],
                            Value: {
                                Data: Value,
                                Type: Type
                            }
                        }
                    });
                }
                return DATA;
            },
            type(Key){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(!Key) throw new TypeError(`Key not found`);
                if(typeof(Key) !== `string`) throw new TypeError(`Key is not a string`);
                let regex = new RegExp(`^.*Key-${Key}.*$`, `m`);
                let match = DATABASE.match(regex);
                if(match){
                    match = match[0].split(`|`);
                    let Type = match[3].split(`Type-`)[1];
                    return Type;
                } else {
                    return undefined;
                }
            },
            get reset(){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                DATABASE = ``;
                let Dir = File.substring(0, File.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }        
                return fs.writeFileSync(File, ``);
            },
            backup(Path){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                if(!Path.includes('.txt')) Path += '.txt';
                let Dir = Path.substring(0, Path.lastIndexOf('/'));
                if(!fs.existsSync(Dir)){
                    if(Dir !== ``){
                        fs.mkdirSync(Dir, { recursive: true });
                    }
                }
                return fs.writeFileSync(Path, DATABASE.trim());
            },
            get length(){
                let DATABASE = fs.readFileSync(File, `utf-8`);
                return DATABASE.split('\n').length > 0 ? (DATABASE.split('\n')[0].length > 0 ? DATABASE.split('\n').length : 0) : 0;
            }
        }
    } catch (error){
        console.error(error);
    }
}
module.exports = { Database };
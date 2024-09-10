import colors from "colors";

type Logger = {
    db(msg:string):void,
    success(msg:string):void
    error(msg:string):void
    warning(msg:string):void
};

const logger : Logger = {
    db: msg => console.log(colors.magenta(msg)),
    success: msg => console.log(colors.green(msg)),
    error: msg => console.log(colors.red(msg)),
    warning: msg => console.log(colors.yellow(msg)),
};

export default logger;
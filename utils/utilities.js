export const sleep = (ms = 2000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const companyASCII = `
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.
%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.
%@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@.
%@@@@@@@@@@%*+-.          ....::
%@@@@@@@@@@@%%##**++==-::..            *# *######-     -+=+=   :+++=   .=:   =   .=++=:   =    -: .=====. .=+++:.=======
%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%.      %@   .@%      .%-   .. %+   :%- -%%-  @. =%:  .** .@    *= :@      @-   .   .@
%@@@@@#+-. .::-==+**#%%@@@@@@@@@.      %@   .@%      **      -@     +# -# %= @. @-     @..@    *= :@++++  =***=.   .@
%@@@@%#*+=-:.             ..:-#@.      %@   .@%      =%      .@:    #+ -#  #=@. #*    -% .@    %= :@          =@   .@
%@@@@@@@@@@@@@@#*+=-:.    .=#@@@.      #%   .%#       -*++++: .*+++*=  -*   #@.  +*++#*.  -*++*+  :@++++: *+++*=   .@
==:   .-=+#%@@@@@@@@@@@@%%@@@@@@.                                                    ==
*+-.         .:-+*#@@@@@@@@@@@@@.
%@@@@#+-.            -#@@@@@@@@@.
%@@@@@@@@@#+-.   :+#@@@@@@@@@@@@.
%@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@#
%@@@@@@@@@@@@@@@@@@@@@@@@@@@@#:
%@@@@@@@@@@@@@@@@@@@@@@@@@@#:

`;

export const getTypeCategory = (type) => { return Object.keys(columnTypeMappings).find(item => columnTypeMappings[item].includes(type))}
export const columnTypeMappings = {
  text: [
    "string",
    "char",
    "varchar",
    "time",
    "timestamp",
    "text",
    "mediumtext",
    "longtext",
    "json",
    "jsonb",
    "binary",
    "enum",
  ],
  number: [
    "decimal",
    "double",
    "float",
    "boolean",
    "integer",
    "bigint",
    "mediumint",
    "tinyint",
    "smallint",
  ],
  date: ["date", "datetime"],
};

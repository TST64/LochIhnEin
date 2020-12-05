const sqlite3 = require('sqlite3').verbose();

exports.ListUsers = function()
{
 
    let theResult = '';
 
    let theDB = new sqlite3.Database('../db/LIE.sqlite', sqlite3.OPEN_READONLY, (err) =>
    {
        if (err) 
        {
          console.error(err.message);
        }
        // console.log('Connected to the LIE database.');
    });

    theDB.serialize(
        function ()
        {
            theDB.each('SELECT User.Name        AS Name, ' +
                    '       User.Passwort    AS Paswort, ' + 
                    '       User.eMail       AS eMail ' +
                    '  FROM [User]', (err, row) => 
            {
            if (err) 
            {
                console.error(err.message);
            }
            theResult = theResult + row.Name + ' ' + 
                                    row.Passwort + ' ' +
                                    row.eMail  + '<br>';

            //   console.log(row.Name + "\t" + 
            //               row.Passwort + "\t" +
            //               row.eMail);
            });
        }
    );
        
    theDB.close(
        function (err)
        {
            if (err) 
            {
                console.error(err.message);
            }
            // console.log('Close the database connection.');
        }
    );

    console.log('--> ' + theResult);
    return theResult;

}

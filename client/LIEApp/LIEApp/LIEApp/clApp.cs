using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace LIEApp
{
    class clApp
    {
        private static Boolean isMember = false;
        private string configFilePath = Path.Combine(System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData), "config.json");
        private static string Name = "";

        public clApp()
        {
        }

        public Boolean CheckUserExists()
        {
            //prüfen, ob der aktuelle user angemeldet ist und welchen Namen er hat
            if (!File.Exists(configFilePath))
            {
                //config datei ist nicht vorhanden, wir legen sie mal an
                File.WriteAllText(configFilePath, "hallo welt");
            }

            return true;
        }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace LIEApp
{
    public partial class MainPage : ContentPage
    {
        private clApp theApplication = new clApp();
        public MainPage()
        {
            InitializeComponent();
        }
        async void OnButtonClicked(object sender, EventArgs args)
        {
            theApplication.CheckUserExists();
        }
    }
}

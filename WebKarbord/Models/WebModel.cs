namespace WebKarbord.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class WebModel : DbContext
    {

        public WebModel() : base()
        {
        }

        public WebModel(string connectionString) : base(connectionString)
        {
            Database.SetInitializer<WebModel>(null);
            SetConnectionString(connectionString);
        }
        public void SetConnectionString(string connectionString)
        {
            this.Database.Connection.ConnectionString = connectionString;
        }

        public virtual DbSet<Access> Access { get; set; }
    }

}

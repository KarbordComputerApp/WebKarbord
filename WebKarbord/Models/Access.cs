namespace WebKarbord.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Access")]
    public partial class Access
    {
        public int Id { get; set; }

        public string lockNumber { get; set; }

        public string CompanyName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string AddressApi { get; set; }

        public string fromDate { get; set; }

        public string untilDate { get; set; }

        public byte? userCount { get; set; }

        public string ACC_Group { get; set; }

        public string INV_Group { get; set; }

        public string FCT_Group { get; set; }

        public string AFI_Group { get; set; }

        public string AFI_Access { get; set; }

        public string CSH_Group { get; set; }

        public string MVL_Group { get; set; }

        public string PAY_Group { get; set; }

        public string ERJ_Group { get; set; }

        public bool active { get; set; }

    }
}
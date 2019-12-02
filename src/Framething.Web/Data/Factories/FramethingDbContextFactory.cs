using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Framething.Web.Data
{
    public class FramethingDbContextFactory : IDesignTimeDbContextFactory<FramethingDbContext>
    {
        public FramethingDbContext CreateDbContext(string[] args) => new FramethingDbContext("Host=localhost;Port=26875;Username=framething;Password=topsecret");
    }
}

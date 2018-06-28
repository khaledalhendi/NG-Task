using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NG_Task.Entities;
using NG_Task.Models;
using NG_Task.Repository;
using NG_Task.Seed;

namespace NG_Task
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            string connectionString = Configuration["sqlconnection"]; 
            services.AddDbContext<NGContext>(o => o.UseSqlServer(connectionString));


            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, NGContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            AutoMapper.Mapper.Initialize(c => {

                c.CreateMap<Customer, CustomerDetailDto>().AfterMap((s, d) =>
                {
                    d.OpenDate = s.OpenDate.ToString("dd-MM-yyyy");
                }); 

                c.CreateMap<Customer, CustomerViewDto>();

                c.CreateMap<Account, AccountDto>().AfterMap((s, d) => 
                {
                    d.Balance = s.Balance.ToString("c", CultureInfo.CreateSpecificCulture(s.Currency.Culture));
                });
                c.CreateMap<AccountCreateDto, Account>();

                c.CreateMap<ClassCode, ClassCodeDto>().AfterMap((s, d) =>
                {
                    d.ClassCode = s.Code;
                });
            });
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "api",
                    template: "api/*");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}

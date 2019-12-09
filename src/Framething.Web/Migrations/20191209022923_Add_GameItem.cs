using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Framething.Web.Migrations
{
    public partial class Add_GameItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "asp_net_user_tokens",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(128)",
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "login_provider",
                table: "asp_net_user_tokens",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(128)",
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "provider_key",
                table: "asp_net_user_logins",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(128)",
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "login_provider",
                table: "asp_net_user_logins",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(128)",
                oldMaxLength: 128);

            migrationBuilder.CreateTable(
                name: "game_item",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(nullable: true),
                    unique_name = table.Column<string>(nullable: true),
                    image_name = table.Column<string>(nullable: true),
                    category = table.Column<byte>(nullable: false),
                    sub_category = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_game_item", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "game_item_component",
                columns: table => new
                {
                    item_id = table.Column<int>(nullable: false),
                    component_id = table.Column<int>(nullable: false),
                    count = table.Column<int>(nullable: false),
                    is_resource = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_game_item_component", x => new { x.item_id, x.component_id });
                    table.ForeignKey(
                        name: "fk_game_item_component_game_item_component_id",
                        column: x => x.component_id,
                        principalTable: "game_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_game_item_component_game_item_item_id",
                        column: x => x.item_id,
                        principalTable: "game_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "game_item_drop",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    game_item_id = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_game_item_drop", x => x.id);
                    table.ForeignKey(
                        name: "fk_game_item_drop_game_item_game_item_id",
                        column: x => x.game_item_id,
                        principalTable: "game_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "ix_game_item_component_component_id",
                table: "game_item_component",
                column: "component_id");

            migrationBuilder.CreateIndex(
                name: "ix_game_item_drop_game_item_id",
                table: "game_item_drop",
                column: "game_item_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "game_item_component");

            migrationBuilder.DropTable(
                name: "game_item_drop");

            migrationBuilder.DropTable(
                name: "game_item");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "asp_net_user_tokens",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "login_provider",
                table: "asp_net_user_tokens",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "provider_key",
                table: "asp_net_user_logins",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "login_provider",
                table: "asp_net_user_logins",
                type: "character varying(128)",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}

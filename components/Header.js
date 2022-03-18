import ResponsiveAppBar from "./ResponsiveAppBar";

const Header = () => {
  const options = [
    {
      text: "有問題嗎？",
      href: "https://github.com/menon-pheno/fullstack-bookstore/issues",
    },
    {
      text: "登出",
      href: "/logout",
      anchor: true,
    },
  ];

  const navPages = ["a", "b", "c"];
  return <ResponsiveAppBar options={options} pages={navPages} />;
};

export default Header;

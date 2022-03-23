import ResponsiveAppBar from "./ResponsiveAppBar";

const Header = () => {
  const options = [
    {
      text: "有問題嗎？",
      isExternal: true,
      href: "https://github.com/menon-pheno/fullstack-bookstore/issues",
    },
    {
      text: "登出",
      href: "/logout",
      isLogout: true,
    },
  ];

  const navPages = [];
  return <ResponsiveAppBar options={options} pages={navPages} />;
};

export default Header;

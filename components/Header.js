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
  return <ResponsiveAppBar options={options} />;
};

export default Header;

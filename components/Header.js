import Link from "next/link";

const Header = () => {
    return (
        <>
            <Link href="/">
                <a>首頁</a>
            </Link>
            <Link href="/test">
                <a>測試頁</a>
            </Link>
        </>
    )
};

export default Header;
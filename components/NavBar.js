import { Navbar, Dropdown, Button, Avatar } from 'flowbite-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import DarkSwitcher from '@/components/DarkSwitcher';
import logo from '@/assets/logo.png';
import { useRouter } from 'next/router';

export default function HeaderNavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = router.pathname;
  const {
    user: { email, name, image: avatar },
  } = session || { user: {} };
  const isLoggedIn = status === 'authenticated';

  return (
    <Navbar fluid={true} rounded={true} className="relative z-10 py-6 !px-0">
      <Navbar.Brand href="/">
        <Image src={logo} width="38" height="38" alt="Ming Logo" />
        <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Ming
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="mr-4">
          <DarkSwitcher />
        </div>
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img={avatar} rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{name}</span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            {/* <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider /> */}
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button color="light" onClick={() => signIn()}>
            Sign in
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={pathname === '/'}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/dashboard" active={pathname === '/dashboard'}>
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="/about" active={pathname === '/about'}>
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

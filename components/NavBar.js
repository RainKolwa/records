import { Navbar, Dropdown, Button, Avatar } from 'flowbite-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import DarkSwitcher from '@/components/DarkSwitcher';

export default function HeaderNavBar() {
  const { data: session, status } = useSession();
  const {
    user: { email, name, image: avatar },
  } = session || { user: {} };
  const isLoggedIn = status === 'authenticated';

  return (
    <Navbar fluid={true} rounded={true} className="relative z-10 py-6">
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Recorder
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
    </Navbar>
  );
}

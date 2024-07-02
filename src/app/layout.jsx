import './globals.css';
import { Providers } from './Providers';

export const metadata = {
  title: 'FreeWork - Find Freelancers & Freelance Jobs Online',
  description: "Find & hire top freelancers, web developers & designers inexpensively. World's largest marketplace of 50m. Receive quotes in seconds. Post your job online now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

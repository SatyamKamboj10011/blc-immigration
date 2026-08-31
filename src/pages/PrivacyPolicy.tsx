import PolicyPage from '../components/PolicyPage';
import { privacyPolicy } from '../data/site';

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      metaTitle="Privacy Policy | Blossom Learning Centre"
      metaDescription="How Blossom Learning Centre (BLC) collects, uses and protects your personal information."
      intro="This policy explains what information Blossom Learning Centre (BLC) collects when you enquire about or use our services, and how we use, store and protect it."
      sections={privacyPolicy}
    />
  );
}

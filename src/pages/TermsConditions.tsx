import PolicyPage from '../components/PolicyPage';
import { termsAndConditions } from '../data/site';

export default function TermsConditions() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      metaTitle="Terms & Conditions | Blossom Learning Centre"
      metaDescription="The terms that govern your use of the Blossom Learning Centre (BLC) website and consultancy services."
      intro="Please read these terms carefully before using our website or engaging Blossom Learning Centre (BLC) for study abroad, immigration or English-language preparation services."
      sections={termsAndConditions}
    />
  );
}

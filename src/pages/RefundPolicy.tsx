import PolicyPage from '../components/PolicyPage';
import { refundPolicy } from '../data/site';

export default function RefundPolicy() {
  return (
    <PolicyPage
      title="Refund & Cancellation Policy"
      metaTitle="Refund & Cancellation Policy | Blossom Learning Centre"
      metaDescription="How Blossom Learning Centre (BLC) handles cancellations and refunds for consultation and service fees."
      intro="This policy explains how refunds and cancellations are handled for BLC's consultancy and preparation services."
      sections={refundPolicy}
    />
  );
}

import React from 'react';
import logo from "../assets/logo.svg";
const RazorpayButton = ({ plan, billingCycle, userType }) => {
  const handlePayment = async () => {
    const amount = plan.price[billingCycle];
    if (amount === 0) {
      alert('This is a free plan. No payment required.');
      return;
    }

    const options = {
      key: 'rzp_live_RDdtqHgENYTAKE', // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Nextute',
      description: `Payment for ${plan.name} - ${billingCycle}`,
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nextute.com%2F&psig=AOvVaw1Iz1i74iPzJzqP15osH5Rk&ust=1757111056543000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMC4vfeSwI8DFQAAAAAdAAAAABAE', // Replace with your logo URL
      handler: function (response) {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        // You can handle the success response here (e.g., update user subscription)
      },
      prefill: {
        name: '', // Replace with user's name
        email: '', // Replace with user's email
        contact: '', // Replace with user's contact number
      },
      notes: {
        plan_id: plan.id,
        billing_cycle: billingCycle,
        user_type: userType,
      },
      theme: {
        color: '#2D7A67',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${plan.buttonStyle} text-white shadow-lg hover:shadow-xl`}
    >
      {plan.buttonText}
    </button>
  );
};

export default RazorpayButton;

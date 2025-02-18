/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51QrEAsLLD78oRxcmejV1nHLzfaAw9eiQZu4SqxxW0ohtI7wtKytGE9Z8zW9OIivKMG9cOfSVShn2Gbd4qCrbpW9E00YiY9xG2a',
);

export const bookTour = async (tourId) => {
  try {
    // console.log('Checking');
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    // console.log('API Response Data:', session.data);
    // console.log('Session Object:', session.data.session); // Check if 'session' exists
    await stripe.redirectToCheckout({
      sessionId: session.data.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

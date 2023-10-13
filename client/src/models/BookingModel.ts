export type Booking = {
  status: string;
  session: {
    id: string;
    object: string;
    after_expiration: null | any;
    allow_promotion_codes: null | any;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
      enabled: boolean;
      status: null | any;
    };
    billing_address_collection: null | any;
    cancel_url: string;
    client_reference_id: string;
    consent: null | any;
    consent_collection: null | any;
    created: number;
    currency: string;
    currency_conversion: null | any;
    custom_fields: any[];
    custom_text: {
      shipping_address: null | any;
      submit: null | any;
      terms_of_service_acceptance: null | any;
    };
    customer: null | any;
    customer_creation: string;
    customer_details: {
      address: null | any;
      email: string;
      name: null | any;
      phone: null | any;
      tax_exempt: string;
      tax_ids: null | any;
    };
    customer_email: string;
    expires_at: number;
    invoice: null | any;
    invoice_creation: {
      enabled: boolean;
      invoice_data: {
        account_tax_ids: null | any;
        custom_fields: null | any;
        description: null | any;
        footer: null | any;
        metadata: Record<string, any>;
        rendering_options: null | any;
      };
    };
    livemode: boolean;
    locale: null | any;
    metadata: Record<string, any>;
    mode: string;
    payment_intent: null | any;
    payment_link: null | any;
    payment_method_collection: string;
    payment_method_configuration_details: null | any;
    payment_method_options: Record<string, any>;
    payment_method_types: string[];
    payment_status: string;
    phone_number_collection: {
      enabled: boolean;
    };
    recovered_from: null | any;
    setup_intent: null | any;
    shipping_address_collection: null | any;
    shipping_cost: null | any;
    shipping_details: null | any;
    shipping_options: any[];
    status: string;
    submit_type: null | any;
    subscription: null | any;
    success_url: string;
    total_details: {
      amount_discount: number;
      amount_shipping: number;
      amount_tax: number;
    };
    url: string;
  };
};

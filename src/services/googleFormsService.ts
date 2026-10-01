export interface FormItem {
  itemId: string;
  title: string;
  description?: string;
  questionItem?: {
    question: {
      questionId: string;
      required?: boolean;
      textQuestion?: {
        paragraph?: boolean;
      };
      choiceQuestion?: {
        type: string;
        options: Array<{ value: string }>;
      };
    };
  };
}

export interface GoogleForm {
  formId: string;
  info: {
    title: string;
    description?: string;
    documentTitle?: string;
  };
  responderUri: string;
  revisionId?: string;
  items?: FormItem[];
}

export interface FormResponseAnswer {
  questionId: string;
  textAnswers?: {
    answers?: Array<{ value: string }>;
  };
}

export interface GoogleFormResponse {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  answers?: Record<string, FormResponseAnswer>;
}

export interface CustomerEnquiry {
  responseId: string;
  submittedAt: string;
  customerName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  rawAnswers: Record<string, string>;
}

export interface DriveFormFile {
  id: string;
  name: string;
  webViewLink?: string;
  createdTime?: string;
  modifiedTime?: string;
}

/**
 * Lists Google Forms from the user's Google Drive.
 */
export async function listGoogleForms(token: string): Promise<DriveFormFile[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.form' and trashed=false");
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink,createdTime,modifiedTime)&pageSize=50&orderBy=modifiedTime desc`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list Google Forms: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Fetches Google Form details by formId.
 */
export async function getGoogleForm(token: string, formId: string): Promise<GoogleForm> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch Google Form details: ${res.status} ${errorText}`);
  }

  return await res.json();
}

/**
 * Creates a dedicated SPAVIBE Customer Enquiries Google Form.
 */
export async function createCustomerEnquiryForm(
  token: string,
  formTitle: string = 'SPAVIBE - Customer Enquiries & Concierge'
): Promise<GoogleForm> {
  // Step 1: Create empty form
  const createUrl = 'https://forms.googleapis.com/v1/forms';
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: {
        title: formTitle,
        documentTitle: formTitle,
      },
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Form: ${createRes.status} ${errorText}`);
  }

  const createdForm: GoogleForm = await createRes.json();
  const formId = createdForm.formId;

  // Step 2: Populate form questions for customer enquiries
  const updateUrl = `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`;
  const batchRequests = {
    requests: [
      {
        updateFormInfo: {
          info: {
            description:
              'Official Customer Enquiry & Appointment Request form for SPAVIBE Luxury Therapy & Wellness Sanctuary, Kozhikode, Kerala.',
          },
          updateMask: 'description',
        },
      },
      {
        createItem: {
          item: {
            title: 'Full Name',
            description: 'Enter your name or preferred title',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false },
              },
            },
          },
          location: { index: 0 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Phone / WhatsApp Number',
            description: 'Primary number for booking confirmation & concierge contact',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: false },
              },
            },
          },
          location: { index: 1 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Email Address',
            description: 'Optional email for digital VIP pass and appointment summary',
            questionItem: {
              question: {
                required: false,
                textQuestion: { paragraph: false },
              },
            },
          },
          location: { index: 2 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Preferred Therapy or Sanctuary Suite',
            description: 'Select your preferred sanctuary experience or inquiry topic',
            questionItem: {
              question: {
                required: true,
                choiceQuestion: {
                  type: 'RADIO',
                  options: [
                    { value: 'Swedish Deep Tissue Recovery (90 min)' },
                    { value: 'Kerala Ayurvedic Abhyanga Ritual (60 min)' },
                    { value: 'Aromatherapy & Herbal Steam Session' },
                    { value: 'Thai Herbal Compress & Warm Oil Therapy' },
                    { value: 'King Royal Sanctuary Suite Private Day Access' },
                    { value: 'VIP Membership & Corporate Pass Inquiry' },
                    { value: 'General Concierge / Custom Timing Inquiry' },
                  ],
                },
              },
            },
          },
          location: { index: 3 },
        },
      },
      {
        createItem: {
          item: {
            title: 'Enquiry Message & Preferred Timing',
            description: 'Please describe your preferred date, time window, or specific wellness needs',
            questionItem: {
              question: {
                required: true,
                textQuestion: { paragraph: true },
              },
            },
          },
          location: { index: 4 },
        },
      },
    ],
  };

  const updateRes = await fetch(updateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(batchRequests),
  });

  if (!updateRes.ok) {
    const errorText = await updateRes.text();
    console.warn(`Form created but questions setup failed: ${updateRes.status} ${errorText}`);
  }

  // Refetch full form details
  return await getGoogleForm(token, formId);
}

/**
 * Fetches all customer enquiry responses from Google Forms.
 */
export async function getCustomerEnquiryResponses(
  token: string,
  formId: string
): Promise<GoogleFormResponse[]> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}/responses`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch form responses: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.responses || [];
}

/**
 * Parses raw Google Form responses into structured CustomerEnquiry objects.
 */
export function parseCustomerEnquiries(
  form: GoogleForm,
  responses: GoogleFormResponse[]
): CustomerEnquiry[] {
  // Map questions by questionId
  const questionMap: Record<string, string> = {};
  if (form.items) {
    for (const item of form.items) {
      const qId = item.questionItem?.question?.questionId;
      if (qId) {
        questionMap[qId] = item.title;
      }
    }
  }

  return responses
    .map((r) => {
      const rawAnswers: Record<string, string> = {};
      let customerName = 'Guest Inquirer';
      let phone = 'Not provided';
      let email = 'Not provided';
      let service = 'General Concierge';
      let message = '';

      if (r.answers) {
        for (const [qId, ans] of Object.entries(r.answers)) {
          const val = ans.textAnswers?.answers?.map((a) => a.value).join(', ') || '';
          const questionTitle = questionMap[qId] || qId;
          rawAnswers[questionTitle] = val;

          const lowerTitle = questionTitle.toLowerCase();
          if (lowerTitle.includes('name')) {
            customerName = val || customerName;
          } else if (lowerTitle.includes('phone') || lowerTitle.includes('whatsapp') || lowerTitle.includes('mobile')) {
            phone = val || phone;
          } else if (lowerTitle.includes('email')) {
            email = val || email;
          } else if (lowerTitle.includes('therapy') || lowerTitle.includes('service') || lowerTitle.includes('suite') || lowerTitle.includes('sanctuary')) {
            service = val || service;
          } else if (lowerTitle.includes('message') || lowerTitle.includes('timing') || lowerTitle.includes('request') || lowerTitle.includes('notes')) {
            message = val || message;
          } else if (!message && val) {
            message = val;
          }
        }
      }

      return {
        responseId: r.responseId,
        submittedAt: r.lastSubmittedTime || r.createTime,
        customerName,
        phone,
        email,
        service,
        message,
        rawAnswers,
      };
    })
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

/**
 * Trashes/deletes a form file in Google Drive.
 * Notice: MUST be called with explicit user confirmation per workspace skill requirements.
 */
export async function deleteFormFile(token: string, fileId: string): Promise<void> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete Google Form: ${res.status} ${errorText}`);
  }
}

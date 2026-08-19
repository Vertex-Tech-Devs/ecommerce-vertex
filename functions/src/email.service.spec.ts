import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSendMail, mockCreateTransport, mockAccessSecretVersion } = vi.hoisted(() => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: 'test-msg-id' });
  const mockCreateTransport = vi.fn(() => ({
    sendMail: mockSendMail,
  }));
  const mockAccessSecretVersion = vi.fn();
  return {
    mockSendMail,
    mockCreateTransport,
    mockAccessSecretVersion,
  };
});

vi.mock('nodemailer', () => ({
  createTransport: mockCreateTransport,
}));

vi.mock('@google-cloud/secret-manager', () => ({
  SecretManagerServiceClient: class {
    accessSecretVersion = mockAccessSecretVersion;
  },
}));

vi.mock('firebase-functions/logger', () => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}));

import { sendEmail, resolveSmtpPassword } from './core/email.service';

describe('Email Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env['SMTP_PASS'];
    delete process.env['SMTP_PASSWORD'];
    delete process.env['SMTP_HOST'];
    delete process.env['SMTP_USER'];
  });

  it('resolves SMTP password from Secret Manager when not in env', async () => {
    mockAccessSecretVersion.mockResolvedValueOnce([
      {
        payload: {
          data: Buffer.from('secret-smtp-password-123'),
        },
      },
    ]);

    const pass = await resolveSmtpPassword();
    expect(pass).toBe('secret-smtp-password-123');
  });

  it('sends email successfully when credentials are valid', async () => {
    mockAccessSecretVersion.mockResolvedValueOnce([
      {
        payload: {
          data: Buffer.from('my-smtp-password'),
        },
      },
    ]);

    const res = await sendEmail({
      to: 'customer@test.com',
      subject: 'Test Subject',
      html: '<p>Hello World</p>',
    });

    expect(res.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'customer@test.com',
        subject: 'Test Subject',
        html: '<p>Hello World</p>',
      }),
    );
  });
});

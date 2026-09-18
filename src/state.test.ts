// src/state.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { getUserSession, updateUserSession } from './state.js';
import { processMessage } from './processor.js';

describe('State Machine Manager', () => {
  it('should initialize user with INICIO state', () => {
    const session = getUserSession('5511999999999@c.us');
    expect(session.state).toBe('INICIO');
  });

  it('should update user state and name properly', () => {
    const phone = '5511888888888@c.us';
    updateUserSession(phone, { state: 'AGUARDANDO_NOME', name: 'Lucas' });
    const session = getUserSession(phone);
    expect(session.state).toBe('AGUARDANDO_NOME');
    expect(session.name).toBe('Lucas');
  });
});
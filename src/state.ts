export type UserState = 'INICIO' | 'AGUARDANDO_NOME' | 'MENU_PRINCIPAL' | 'FALANDO_ATENDENTE';

interface UserSession {
    state: UserState;
    name?: string;
    lastInteraction: number;
}

const sessions = new Map<string, UserSession>();

export function getUserSession(phoneId: string): UserSession {
    if (!sessions.has(phoneId)) {
        sessions.set(phoneId, { state: 'INICIO', lastInteraction: Date.now() });
    }
    return sessions.get(phoneId)!;
}

export function updateUserSession(phoneId: string, data: Partial<UserSession>): void {
    const current = getUserSession(phoneId);
    sessions.set(phoneId, { ...current, ...data, lastInteraction: Date.now() });
}
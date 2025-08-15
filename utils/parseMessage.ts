export function parseMessage(value: string) {
    try {
        const parsed = JSON.parse(value);
        // Se o parse funcionar e existir a propriedade message
        if (parsed && typeof parsed === 'object' && 'message' in parsed) {
            return parsed.message;
        }
    } catch {
        // Não é JSON, retorna a string original
    }
    return value;
}

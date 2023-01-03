import { AuthRequest } from "../interface/authRequest"

export function getUserEmail(req: AuthRequest) {
    let user: string | undefined;
    if (req.oidc.isAuthenticated ()) {
        user = req.oidc.user?.name ?? req.oidc.user?.sub;
    }
    return user;
}

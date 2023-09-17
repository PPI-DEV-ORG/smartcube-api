enum UserRoles {
    Admin = 1,
    Member = 2
}

interface IAuthGuard {
    getUserId(): number,
    getUserEmail(): string,
    getUsername(): string,
    getUserRole(): UserRoles
}

export {IAuthGuard, UserRoles}
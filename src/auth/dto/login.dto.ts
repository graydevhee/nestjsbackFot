// user/user.service.ts
async findOneByUsernameWithPassword(username: string): Promise<User | undefined> {
  return this.usersRepository
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .addSelect('user.password') // Yêu cầu TypeORM lấy thêm cột password
    .getOne();
}
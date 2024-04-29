import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetUser, RawHeadres, RoleProtected } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @Get()
  // @UseGuards(AuthGuard())
  // findAll(
  //   // @Req() request: Express.Request
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,
  //   @RawHeadres() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders
  // ) {

  //   return { user, userEmail, rawHeaders, headers };
  // }


  // @Get()
  // @RoleProtected(ValidRoles.superUser, ValidRoles.user)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // findAll(
  //   @GetUser() user: User,
  // ) {

  //   return { user,};
  // }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(
    @GetUser() user: User,
  ) {

    return 'hola';
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `

h ttps://readrealm-7cb62793f02a.herokuapp.com

/dip/basic -> day 01
/dip/clr -> color space
/dip/hst -> histogram
/dip/sf -> spartial filtering
/dip/morph -> morphological
/dip/it -> intensity tansfo
/dip/edge -> edge detect
    `}
}

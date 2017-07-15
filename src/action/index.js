// @flow
// viewer
import nextElement from './nextElement'
import previousElement from './previousElement'
import toggleFit from './toggleFit'
import toggleSidePanel from './toggleSidePanel'
// illust
import toggleEditor from './toggleEditor'
import likeIt from './likeIt'
import share from './share'
import donwload from './download'
// help
import toggleHelp from './toggleHelp'

import command from '../store/command'

command.register(nextElement)
command.register(previousElement)

command.register(toggleFit)
command.register(toggleSidePanel)

command.register(toggleEditor)
command.register(likeIt)
command.register(share)
command.register(donwload)

command.register(toggleHelp)

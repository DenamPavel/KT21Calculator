
import React from 'react';
import {
  Col,
  Container,
  Row,
  //Stack,
} from 'react-bootstrap';

import IncDecSelect, {Props as IncProps} from 'src/components/IncDecSelect';
import * as Util from 'src/Util';
import { boolToCheckX as toCheckX } from 'src/Util';
import Attacker from 'src/Attacker';
import {rerollAbilities as rerolls} from 'src/Ability';


export interface Props {
  title: string;
  attacker: Attacker;
  changeHandler: Util.Accepter<Attacker>;
}

const FighterControls: React.FC<Props> = (props: Props) => {
  const attacksId = 'Attacks';
  const bsId = 'WS';
  const normDmgId = 'Normal Damage';
  const critDmgId = 'Critical Damage';
  const lethalxId = 'Lethal';
  const brutalId = 'Brutal';

  const woundsId = 'Wounds';
  const fnpId = 'FeelNoPain (TODO)';
  const rerollId = 'Reroll';
  const rendingId = 'Rending';
  const stormShieldId = 'Storm Shield';

  const atk = props.attacker;
  const [textHandler, numHandler, boolHandler]
    = Util.makePropChangeHandlers(atk, props.changeHandler);

  const params: IncProps[] = [
    //           id/label,      selectedValue,             values,              valueChangeHandler
    new IncProps(attacksId,     atk.attacks,               Util.span(1, 8),       numHandler('attacks')),
    new IncProps(bsId,          atk.bs + '+',              Util.rollSpan,         numHandler('bs')),
    new IncProps(normDmgId,     atk.normDmg,               Util.span(1, 9),       numHandler('normDmg')),
    new IncProps(critDmgId,     atk.critDmg,               Util.span(1, 9),       numHandler('critDmg')),
    new IncProps(lethalxId,     atk.lethalx + '+',         Util.xspan(4, 5, '+'), numHandler('lethalx')),
    new IncProps(rerollId,      atk.reroll,                Util.preX(rerolls),    textHandler('reroll')),
    // 2nd col
    new IncProps(woundsId,      atk.wounds,                Util.span(1, 19),      numHandler('wounds')),
    new IncProps(fnpId,         atk.fnp + '+',             Util.xspan(3, 6, '+'), numHandler('fnp')),
    new IncProps(rendingId,     toCheckX(atk.rending),     Util.xAndCheck,        boolHandler('rending')),
    new IncProps(brutalId,      toCheckX(atk.brutal),      Util.xAndCheck,        boolHandler('brutal')),
    new IncProps(stormShieldId, toCheckX(atk.stormShield), Util.xAndCheck,        boolHandler('stormShield')),
  ];

  const paramElems = params.map(p =>
    <Row key={p.id}><Col className='pr-0'><IncDecSelect {...p}/></Col></Row>);
  const splitPoint = (paramElems.length + 1) / 2;
  const paramElemsHalf1 = paramElems.slice(0, splitPoint);
  const paramElemsHalf2 = paramElems.slice(splitPoint);

  return (
    <Container style={{width: '310px'}}>
      <Row>{props.title}</Row>
      <Row>
        <Col>
          <Container className='p-0'>
            {paramElemsHalf1}
          </Container>
        </Col>
        <Col>
          <Container className='p-0'>
            {paramElemsHalf2}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default FighterControls;
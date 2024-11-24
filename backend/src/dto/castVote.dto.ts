import { ApiProperty } from "@nestjs/swagger";

export default class CastVoteDto {
  @ApiProperty({ type: String, required: true })
  address: string;
  @ApiProperty({ type: Number, required: true })
  proposalIndex: number;
  @ApiProperty({ type: Number, required: true })
  votingPower: number;
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockGovernanceProposals } from "@/lib/mock-data"
import { formatAddress, formatDate } from "@/lib/utils"
import { Check, Clock, X } from "lucide-react"
import { toast } from "sonner"

export function Proposals() {
  const [proposals, setProposals] = useState(mockGovernanceProposals)

  const handleVote = (proposalId: string, vote: "yes" | "no") => {
    setProposals(
      proposals.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedProposal = {
            ...proposal,
            votes: {
              ...proposal.votes,
              [vote]: proposal.votes[vote] + 100000,
            },
          }
          return updatedProposal
        }
        return proposal
      }),
    )

    toast.success(`Voted ${vote} on proposal`)
  }

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-background/60">
      <CardHeader>
        <CardTitle>Governance Proposals</CardTitle>
        <CardDescription>Vote on protocol changes and improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="border-border/40 backdrop-blur-sm bg-background/60">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  {proposal.status === "active" ? (
                    <div className="flex items-center text-yellow-400 text-sm">
                      <Clock className="mr-1 h-4 w-4" />
                      Active
                    </div>
                  ) : proposal.status === "passed" ? (
                    <div className="flex items-center text-green-400 text-sm">
                      <Check className="mr-1 h-4 w-4" />
                      Passed
                    </div>
                  ) : (
                    <div className="flex items-center text-red-400 text-sm">
                      <X className="mr-1 h-4 w-4" />
                      Rejected
                    </div>
                  )}
                </div>
                <CardDescription>
                  Proposed by {formatAddress(proposal.proposer)} • {formatDate(proposal.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{proposal.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Yes ({(proposal.votes.yes / 1000000).toFixed(1)}M)</span>
                    <span>No ({(proposal.votes.no / 1000000).toFixed(1)}M)</span>
                  </div>
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-green-500"
                      style={{
                        width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-red-500"
                      style={{
                        width: `${(proposal.votes.no / (proposal.votes.yes + proposal.votes.no)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {proposal.status === "active" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400"
                      onClick={() => handleVote(proposal.id, "yes")}
                    >
                      Vote Yes
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      onClick={() => handleVote(proposal.id, "no")}
                    >
                      Vote No
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

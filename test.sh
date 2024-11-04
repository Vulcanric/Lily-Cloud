#!/bin/bash
# Test Looping through commands
# set -x  # For debugging

function log_exit_status {
	echo -e "\033[$2mScript exited with status $1\033[0m"
	exit "$1"
}

CMD_1="ls"
CMD_2="ls -a"
CMD_3="ls -t"
E_STATUS=0

CMDS=(
	"$CMD_1"
	"$CMD_2"
	"drasticals"
	"$CMD_3"
)
$CMD_1[0:2]
for CMD in "${CMDS[@]}"
do
	echo -e "\n\033[33mRunning command '$CMD'\n---------------------\033[0m"
	eval "$CMD"
	E_STATUS="$?"
	if [ "$E_STATUS" -ne "0" ]; then
		log_exit_status "$E_STATUS" 31
	fi
	sleep 1
done
log_exit_status "$E_STATUS" 32
